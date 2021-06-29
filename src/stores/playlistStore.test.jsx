import React, { useContext, useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import { PlaylistStore, PlaylistStoreProvider } from './playlistStore';

describe('PlaylistStore', () => {
  test('intial state', () => {
    render(
      <PlaylistStore.Consumer>{(state) => (
        <>
        <span data-testid="activePlaylistID">{JSON.stringify(state.activePlaylistID)}</span>
        <span data-testid="activeTrackID">{JSON.stringify(state.activeTrackID)}</span>
        <span data-testid="activeTrackName">{JSON.stringify(state.activeTrackName)}</span>
        <span data-testid="isPlaying">{JSON.stringify(state.isPlaying)}</span>
        </>
      )}
      </PlaylistStore.Consumer>
    );

    expect(screen.getByTestId('activePlaylistID').textContent).toEqual('');
    expect(screen.getByTestId('activeTrackID').textContent).toEqual('');
    expect(screen.getByTestId('activeTrackName').textContent).toEqual('');
    expect(screen.getByTestId('isPlaying').textContent).toEqual('');
  });

  test('update playlist', async () => {
    const Comp = () => {
      const { state, dispatch } = useContext(PlaylistStore);

      useEffect(() => {
        dispatch({ type: 'UPDATE_PLAYLIST_ID', payload: '37i9dQZF1DWWGFQLoP9qlv' });
      }, [])

      return (
        <>
          <span data-testid="activePlaylistID">{state.activePlaylistID}</span>
        </>
      )
    }

    render(
      <PlaylistStoreProvider>
        <Comp />
      </PlaylistStoreProvider>
    );

    expect(screen.getByTestId('activePlaylistID').textContent).toEqual('37i9dQZF1DWWGFQLoP9qlv');
  });

  test('update current track', async () => {
    const Comp = () => {
      const { state, dispatch } = useContext(PlaylistStore);

      useEffect(() => {
        dispatch({ type: 'UPDATE_ACTIVE_TRACK', payload: { name: 'Hello', id: '37i9dQZF1DWWGFQLoP9qlv' } });
      }, [])

      return (
        <>
          <span data-testid="activeTrackID">{state.activeTrackID}</span>
          <span data-testid="activeTrackName">{state.activeTrackName}</span>
        </>
      )
    }

    render(
      <PlaylistStoreProvider>
        <Comp />
      </PlaylistStoreProvider>
    );

    expect(screen.getByTestId('activeTrackID').textContent).toEqual('37i9dQZF1DWWGFQLoP9qlv');
    expect(screen.getByTestId('activeTrackName').textContent).toEqual('Hello');
  });

  test('update play state', async () => {
    const Comp = () => {
      const { state, dispatch } = useContext(PlaylistStore);

      useEffect(() => {
        dispatch({ type: 'UPDATE_PLAY_STATE', payload: true });
      }, [])

      return (
        <>
          <span data-testid="isPlaying">{state.isPlaying ? 'true' : 'false'}</span>
        </>
      )
    }

    render(
      <PlaylistStoreProvider>
        <Comp />
      </PlaylistStoreProvider>
    );

    expect(screen.getByTestId('isPlaying').textContent).toEqual('true');
  });
});
