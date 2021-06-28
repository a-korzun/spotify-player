import { PlaylistStore } from './playlistStore';

jest.mock('@/services/api');
jest.mock('./authStore');

describe('playlistStore', () => {
  it('load playlists', async () => {
    const store = new PlaylistStore();

    expect(store.state).toEqual('idle');

    await store.loadPlaylists();

    expect(store.playlists).toEqual(Array.from({ length: 13 }, () => ({
      id: '1',
      name: 'playlist 1',
      picture: 'foo',
      tracksAmount: 99,
    })));

    expect(store.state).toEqual('done');
  });
});