import React, { useContext } from 'react';

import ThemeSwitcher from '@/components/ThemeSwitcher';
import { PlaylistStore } from '@/stores/playlistStore';

import './styles.scss';

function Header () {
  const { state } = useContext(PlaylistStore);

  return (
    <header className="header">
      <h1 className="header__title">Spotify Player</h1>
      <p className="header__current-track" data-testid="header__current-track">{state.isPlaying === true && state.activeTrackName}</p>
      <ThemeSwitcher />
    </header>
  )
}

export default Header;