import { TracksStore } from './tracksStore';

jest.mock('@/services/api');
jest.mock('./authStore');

describe('tracksStore', () => {
  it('load tracks and more', async () => {
    const store = new TracksStore();

    expect(store.state).toEqual('idle');

    await store.loadTracks(1);

    expect(store.state).toEqual('done');
    expect(store.total).toEqual(300);
    expect(store.limit).toEqual(100);
    expect(store.offset).toEqual(100);
    expect(store.tracks.length).toEqual(100);

    await store.loadMore();

    expect(store.state).toEqual('done');
    expect(store.total).toEqual(300);
    expect(store.limit).toEqual(100);
    expect(store.offset).toEqual(200);
    expect(store.tracks.length).toEqual(200);

    await store.loadMore();

    expect(store.state).toEqual('done');
    expect(store.total).toEqual(300);
    expect(store.limit).toEqual(100);
    expect(store.offset).toEqual(300);
    expect(store.tracks.length).toEqual(300);

    await store.loadMore();

    expect(store.state).toEqual('done');
    expect(store.total).toEqual(300);
    expect(store.limit).toEqual(100);
    expect(store.offset).toEqual(300);
    expect(store.tracks.length).toEqual(300);
  });
});