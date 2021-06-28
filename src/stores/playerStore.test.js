import { PlayerStore } from './playerStore';

jest.mock('@/services/api');
jest.mock('./authStore');

describe('player store', () => {
  it('init audio', async () => {
    const store = new PlayerStore();

    await store.fetchAudio();

    store.audio.addEventListener('canplay', () => {
      expect(store.audio.url).toEqual('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    });
  });


  it('toggle play state', async () => {
    const store = new PlayerStore();

    await store.fetchAudio();

    store.audio.addEventListener('canplay', () => {
      store.play();

      expect(store.playState).toEqual('play');
      expect(store.audio.paused).toEqual(false);

      store.pause();

      expect(store.playState).toEqual('pause');
      expect(store.audio.paused).toEqual(true);
    });
  });
});