import { fetchPlaylist } from '@/services/api';
import { processTracks } from '@/services/dataFormatters';
import { action, makeObservable, observable, runInAction } from 'mobx';

import authStore from './authStore';

class TracksStore {
  tracks: Track[] = [];
  state: 'idle' | 'pending' | 'done' | 'error' = 'idle';
  offset: number = 0;
  limit: number = 0;
  total: number = 0;

  constructor() {
    makeObservable(this, {
      tracks: observable,
      state: observable,
      loadTracks: action,
    });
  }

  async loadTracks(playlistID: Playlist['id']) {
    this.state = 'pending';

    if (authStore.accessToken === undefined) {
      throw new ReferenceError('accessToken is not provided');
    }

    try {
      const data = await fetchPlaylist(authStore.accessToken, playlistID);
      const { tracks, limit, offset, total } = processTracks(data);

      runInAction(() => {
        this.limit = limit;
        this.offset = offset;
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
}

export default new TracksStore();
