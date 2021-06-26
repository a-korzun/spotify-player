import React from 'react';

import ThemeSwitcher from '@/components/ThemeSwitcher';

import './styles.scss';

function Header () {
  return (
    <header className="header">
      <h1>Spotify Player</h1>
      <ThemeSwitcher />
    </header>
  )
}

export default Header;