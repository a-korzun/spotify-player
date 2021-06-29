import React, { useEffect, useState, useContext } from 'react';

import LybraryItem from '@/components/LibraryItem';

import { PlaylistStore } from '@/stores/playlistStore';
import { AuthStore } from '@/stores/authStore';
import { fetchPlaylist } from '@/services/api';

import './styles.scss';

const predefinedPlaylists = [
  '37i9dQZF1DWXRqgorJj26U',
  '37i9dQZF1DWWGFQLoP9qlv',
  '37i9dQZEVXbKCF6dqVpDkS',
  '37i9dQZF1DX2RxBh64BHjQ',
  '37i9dQZF1DWWqNV5cS50j6',
  '65xSncKQzG6Suseh5gfYP1',
  '37i9dQZF1DX4JAvHpjipBk',
  '6fO3gSb2WXw6hgqY7nDe2C',
  '37i9dQZF1DXcWxeqLvgOCi',
  '37i9dQZF1DXc8kgYqQLMfH',
  '5Xtj5QwZG7WzDY1C5wozcL',
  '37i9dQZF1DWWjGdmeTyeJ6',
  '37i9dQZF1DX6mMeq1VVekF',
];

function Library() {
  const [loadingState, setLoadingState] = useState<'idle' | 'pending' | 'done' | 'error'>('idle');
  const [playlists, setPlaylists] = useState<PlaylistPreview[]>([]);

  const { accessToken } = useContext(AuthStore).state;
  const { dispatch } = useContext(PlaylistStore);

  useEffect(() => {
    const init = async () => {
      setLoadingState('pending');

      try {
        const queue = predefinedPlaylists.map(id => fetchPlaylist(accessToken, id));
        const playlists = await Promise.all(queue);

        setPlaylists(playlists);

        setLoadingState('done');
      } catch (err) {
        setLoadingState('error');

        console.error(err);
      }
    }

    init()
  }, []);

  const handleSelectPlaylist = (id: string) => {
    dispatch({ type: 'UPDATE_PLAYLIST_ID', payload: id })
  }

  const list = playlists.map(preview => (
    <LybraryItem
      className="library__item"
      key={preview.id}
      preview={preview}
      onClick={() => handleSelectPlaylist(preview.id)}
    />
  ));

  return (
    <ul className="library" data-testid="library">
      {loadingState === 'pending' && <div className="library__placeholder">Loading...</div>}
      {loadingState === 'error' && <div className="library__placeholder">Something went wrong</div>}
      {loadingState === 'done' && list}
    </ul>
  );
}

export default Library;
