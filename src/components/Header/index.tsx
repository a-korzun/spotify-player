import React from 'react';
import { observer } from 'mobx-react-lite';

import ThemeSwitcher from '@/components/ThemeSwitcher';

import playerStore from '@/stores/playerStore';

import './styles.scss';

function Header () {
  return (
    <header className="header">
      <h1 className="header__title">Spotify Player</h1>
      {playerStore.playState === 'play' && <p className="header__current-track">{playerStore.trackName}</p>}
      <ThemeSwitcher />
    </header>
  )
}

export default observer(Header);