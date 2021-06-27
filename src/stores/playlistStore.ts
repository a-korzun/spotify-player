import { fetchPlaylist } from '@/services/api';
import { processPlaylist } from '@/services/dataFormatters';
import { makeObservable, observable, action, runInAction } from 'mobx';

import authStore from './authStore';

const predefinedPlaylists = [
  '37i9dQZF1DWXRqgorJj26U',
  '37i9dQZF1DWWGFQLoP9qlv',
  '37i9dQZEVXbKCF6dqVpDkS',
];

class PlaylistStore {
  playlists: Playlist[] = [];
  state: 'idle' | 'pending' | 'done' | 'error' = 'idle';
  offset: number = 0;
  limit: number = 0;

  constructor() {
    makeObservable(this, {
      playlists: observable,
      state: observable,
      loadPlaylists: action,
    });
  }

  async loadPlaylists() {
    this.state = 'pending';

    if (authStore.accessToken === undefined) {
      throw new ReferenceError('accessToken is not provided');
    }

    try {
      const queue = predefinedPlaylists.map(id => fetchPlaylist(authStore.accessToken!, id));
      const playlists = await Promise.all(queue);

      runInAction(() => {
        this.playlists = playlists.map(processPlaylist);
        this.state = 'done';
      })
    } catch (err) {
      runInAction(() => {
        this.state = 'error';

        console.error(err);
      });
    }
  }
}

export default new PlaylistStore();
