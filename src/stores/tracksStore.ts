import { action, makeObservable, observable } from 'mobx';

class TracksStore {
  tracks: Track[] = [];
  state: 'idle' | 'pending' | 'done' | 'error' = 'idle';

  constructor() {
    makeObservable(this, {
      tracks: observable,
      state: observable,
      loadTracks: action,
    });
  }

  loadTracks(playlistId: Playlist['id']) {
    this.state = 'pending';

    setTimeout(action('fetchSuccess', () => {
      this.tracks = Array.from({ length: 99 }, (el, index) => ({
        id: index,
        index: index,
        artists: index % 2 === 0 ? [{ name: 'foo', id: 'foo' }] : [{ name: 'foo', id: 'foo' }, { name: 'bar bzz', id: 'bar bzz' }],
        duration: Math.floor(Math.random() * 10) * 1000 * 60,
        name: 'track name track name track name',
      }));

      this.state = 'done';
    }), 3000);
  }
}

export default new TracksStore();
