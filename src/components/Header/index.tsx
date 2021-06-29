import React, { useContext } from 'react';

import ThemeSwitcher from '@/components/ThemeSwitcher';

import './styles.scss';
import { PlaylistStore } from '@/stores/playlistStore';

function Header () {
  const { state } = useContext(PlaylistStore);

  return (
    <header className="header">
      <h1 className="header__title">Spotify Player</h1>
      {state.isPlaying === true && <p className="header__current-track">{state.activeTrackName}</p>}
      <ThemeSwitcher />
    </header>
  )
}

export default Header;