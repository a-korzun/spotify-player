import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import { AuthStore } from '@/stores/authStore';
import { PlaylistStore } from '@/stores/playlistStore';

import Library from './';

jest.mock('@/services/api');

describe('Library', () => {
  test('render playlists', async () => {
    await act(async () => {
      render(
        <AuthStore.Provider value={{ state: { accessToken: '' }, dispatch: () => null }}>
        <PlaylistStore.Provider value={{
          state: { isPlaying: false, activePlaylistID: '' },
          dispatch: () => null,
        }}>
            <Library />
          </PlaylistStore.Provider>
        </AuthStore.Provider>
      )
    });

    expect(screen.getByTestId('library').textContent).toEqual('99playlist 37i9dQZF1DWXRqgorJj26U99playlist 37i9dQZF1DWWGFQLoP9qlv99playlist 37i9dQZEVXbKCF6dqVpDkS99playlist 37i9dQZF1DX2RxBh64BHjQ99playlist 37i9dQZF1DWWqNV5cS50j699playlist 65xSncKQzG6Suseh5gfYP199playlist 37i9dQZF1DX4JAvHpjipBk99playlist 6fO3gSb2WXw6hgqY7nDe2C99playlist 37i9dQZF1DXcWxeqLvgOCi99playlist 37i9dQZF1DXc8kgYqQLMfH99playlist 5Xtj5QwZG7WzDY1C5wozcL99playlist 37i9dQZF1DWWjGdmeTyeJ699playlist 37i9dQZF1DX6mMeq1VVekF');
  });
});