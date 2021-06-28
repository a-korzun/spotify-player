import { ArtistsStore } from './artistsStore';

jest.mock('@/services/api');
jest.mock('./authStore');

describe('artistsStore', () => {
  it('loadArtist by id', async () => {
    const store = new ArtistsStore();

    await store.loadArtists(['1', '2']);

    expect(store.artists).toEqual([
      {
        id: '1',
        name: 'Artist 1',
        genres: ['pop']
      },
      {
        id: '2',
        name: 'Artist 2',
        genres: ['rock']
      }
    ]);

    expect(store.state).toEqual('done');
  });
});