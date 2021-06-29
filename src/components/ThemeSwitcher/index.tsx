import React, { useEffect, useState } from 'react';

import './styles.scss';

type Theme = 'dark' | 'light';

const defaultTheme: Theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const toggleRules: Record<Theme, Theme> = {
  dark: 'light',
  light: 'dark',
};

function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>(document.documentElement.dataset.theme as Theme || defaultTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  });

  const handleToggle = () => setTheme(toggleRules[theme]);

  return (
    <button
      type="button"
      className={`theme-switcher _${theme}`}
      onClick={handleToggle}
    >
      {toggleRules[theme]}
    </button>
  )
}

export default ThemeSwitcher;