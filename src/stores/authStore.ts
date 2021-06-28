import { makeObservable, observable, runInAction, action } from 'mobx';

import { retrieveAccessToken } from '@/services/api';

class AuthStore {
  accessToken: string | undefined;
  state: 'idle' | 'pending' | 'done' | 'error' = 'idle';

  constructor() {
    makeObservable(this, {
      accessToken: observable,
      state: observable,
      fetchToken: action,
    })
  }

  async fetchToken() {
    this.state = 'pending';

    try {
      const token = await retrieveAccessToken();

      runInAction(() => {
        this.accessToken = token;
        this.state = 'done';
      });
    } catch (err) {
      runInAction(() => {
        this.state = 'error';
      });

      throw err;
    }
  }
}

export default new AuthStore();
