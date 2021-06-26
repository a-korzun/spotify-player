import React, { useState } from 'react';

import './styles.scss';

function Search () {
  const [query, setQuery] = useState<string>('');
  const [focused, setFocused] = useState<boolean>(false);

  const predefinedPlaylists = [
    '37i9dQZF1DWXRqgorJj26U',
    '37i9dQZF1DWWGFQLoP9qlv',
    '37i9dQZEVXbKCF6dqVpDkS',
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }

  const handleSelect = (value: string) => {
    setQuery(value);
    setFocused(false);
  }

  const handleFocus = () => setFocused(true);

  const handleBlur = () => setFocused(false);

  return (
    <div className="search">
      <input
        className="search__input"
        value={query}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <ul className="search__list">
        {focused && predefinedPlaylists.map(i => (
          <li key={i} className="search__item" role="button" onMouseDown={() => handleSelect(i)}>{i}</li>
        ))}
      </ul>
    </div>
  )
}

export default Search;