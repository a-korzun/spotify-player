import { makeObservable, observable, action } from 'mobx';

class PlaylistStore {
  playlists: Playlist[] = [];
  state: 'idle' | 'pending' | 'done' | 'error' = 'idle';

  constructor() {
    makeObservable(this, {
      playlists: observable,
      state: observable,
      loadPlaylists: action,
    });
  }

  loadPlaylists() {
    this.state = 'pending';

    setTimeout(action('fetchSuccess', () => {
      this.playlists = Array
        .from({ length: 99 }, (x, index) => ({
          id: 'https://via.placeholder.com/600/24f355__' + index,
          name: 'https://via.placeholder.com/600/24f355__' + index,
          picture: 'https://via.placeholder.com/600/24f355',
          tracksAmout: Math.floor(Math.random() * 100),
        }));

      this.state = 'done'
    }), 3000);
  }
}

export default new PlaylistStore();
