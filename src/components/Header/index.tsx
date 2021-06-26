import React from 'react';

import ThemeSwitcher from '@/components/ThemeSwitcher';
import Search from '@/components/Search';

import './styles.scss';

function Header () {
  return (
    <header className="header">
      <Search />
      <ThemeSwitcher />
    </header>
  )
}

export default Header;