import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Header from '@/components/Header';
import Library from '@/components/Library';
import Playlist from '@/components/Playlist';

import authStore from '@/stores/authStore';
import playlistStore from '@/stores/playlistStore';

import './styles.scss';

function App() {
  const authState = authStore.state;
  const playlists = playlistStore.playlists;
  const playlistsLoadingState = playlistStore.state;

  useEffect(() => {
    authStore.fetchToken();
  }, [])

  return (
    <div className="app">
      <Header />
      {authState === 'pending' && <span key="pending">Authentication...</span>}
      {authState === 'done' && <Library />}
      {authState === 'done' && playlistsLoadingState === 'done' && playlists.length > 0 && <Playlist />}
      {authState === 'error' && <span key="error">Authentication failed</span>}
    </div>
  );
}

export default observer(App);
