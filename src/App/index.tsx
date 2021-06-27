import React from 'react';
import { observer } from 'mobx-react-lite';

import Header from '@/components/Header';
import Library from '@/components/Library';
import Playlist from '@/components/Playlist';

import playlistStore from '@/stores/playlistStore';

import './styles.scss';

function App() {
  const playlists = playlistStore.playlists;
  const playlistsLoadingState = playlistStore.state;

  return (
    <div className="app">
      <Header />
      <Library />
      {playlistsLoadingState === 'done' && playlists.length > 0 && <Playlist />}
    </div>
  );
}

export default observer(App);
