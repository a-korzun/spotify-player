import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import { PlaylistStore } from '@/stores/playlistStore';
import Header from './';

describe('Header', () => {
  test('render header without active track', () => {
    render(
      <PlaylistStore.Provider value={{
        state: { isPlaying: false, activeTrackID: undefined, activePlaylistID: '' },
        dispatch: () => null,
      }}>
        <Header />
      </PlaylistStore.Provider>
    );

    expect(screen.getByTestId('header__current-track').textContent).toEqual('');
  });

  test('render header with active track', () => {
    render(
      <PlaylistStore.Provider value={{
        state: { isPlaying: true, activeTrackID: '1', activeTrackName: 'Hello', activePlaylistID: '' },
        dispatch: () => null,
      }}>
        <Header />
      </PlaylistStore.Provider>
    );

    expect(screen.getByTestId('header__current-track').textContent).toEqual('Hello');
  });
});