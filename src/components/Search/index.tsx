import React, { useState } from 'react';

function Search () {
  const [query, setQuery] = useState<string>();

  const predefinedPlaylists = [
    '37i9dQZF1DWXRqgorJj26U',
    '37i9dQZF1DWWGFQLoP9qlv',
    '37i9dQZEVXbKCF6dqVpDkS',
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }

  return (
    <div>
      <input />
    </div>
  )
}

export default Search;