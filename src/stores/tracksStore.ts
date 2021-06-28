import { fetchTracks } from '@/services/api';
import { processTracks } from '@/services/dataFormatters';
import { action, makeObservable, observable, runInAction } from 'mobx';

import authStore from './authStore';

export class TracksStore {
  tracks: Track[] = [];
  state: 'idle' | 'pending' | 'done' | 'error' = 'idle';
  offset: number = 0;
  limit: number = 0;
  total: number = 0;
  playlistID: string | undefined;

  constructor() {
    makeObservable(this, {
      tracks: observable,
      state: observable,
      offset: observable,
      loadTracks: action,
    });
  }

  async loadTracks(playlistID: Playlist['id']) {
    this.state = 'pending';
    this.playlistID = playlistID;
    this.tracks = [];

    if (authStore.accessToken === undefined) {
      throw new ReferenceError('accessToken is not provided');
    }

    try {
      const data = await fetchTracks(authStore.accessToken, playlistID);
      const { tracks, limit, total } = processTracks(data);

      runInAction(() => {
        this.limit = limit;
        this.offset = limit;
        this.total = total;
        this.tracks = tracks;

        this.state = 'done';
      });
    } catch (err) {
      runInAction(() => {
        this.state = 'error';

        console.error(err);
      });
    }
  }

  async loadMore() {
    if (this.state === 'pending') {
      return;
    }

    if (this.tracks.length >= this.total) {
      return;
    }

    this.state = 'pending';

    if (authStore.accessToken === undefined) {
      throw new ReferenceError('accessToken is not provided');
    }

    if (!this.playlistID) {
      throw new ReferenceError('playlistID is not provided');
    }

    try {
      const data = await fetchTracks(authStore.accessToken, this.playlistID, this.offset);
      const { tracks, limit } = processTracks(data);

      runInAction(() => {
        this.offset = this.offset + limit;
        this.tracks.push(...tracks);

        this.state = 'done';
      });
    } catch (err) {
      runInAction(() => {
        this.state = 'error';

        console.error(err);
      });
    }
  }
}

export default new TracksStore();
