import React, { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>(document.documentElement.dataset.theme as Theme || 'light');

  const toggleRules: Record<Theme, Theme> = {
    dark: 'light',
    light: 'dark',
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  });

  return (
    <button type="button" onClick={() => setTheme(toggleRules[theme])}>
      {toggleRules[theme]}
    </button>
  )
}

export default ThemeSwitcher;