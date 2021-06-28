import { action, makeObservable, observable, runInAction } from 'mobx';

import { fetchArtists } from '@/services/api';

import authStore from './authStore';

export class ArtistsStore {
  artists: Artist[] = [];
  state: 'idle' | 'pending' | 'done' | 'error' = 'idle';

  constructor() {
    makeObservable(this, {
      state: observable,
      artists: observable,
      loadArtists: action,
    });
  }

  async loadArtists(ids: string[]) {
    this.state = 'pending';

    if (authStore.accessToken === undefined) {
      throw new ReferenceError('accessToken is not provided');
    }

    try {
      const { artists } = await fetchArtists(authStore.accessToken, ids);

      runInAction(() => {
        this.artists = artists.map(({ id, name, genres }) => ({ id, name, genres }));

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

export default new ArtistsStore();
