import React from 'react';

import LybraryItem from '@/components/LibraryItem';

import './styles.scss';

function Library() {
  const items = Array
    .from({ length: 99 })
    .map((x, index) => ({ pic: 'https://via.placeholder.com/600/24f355', amount: Math.floor(Math.random() * 100), name: index }));

  return (
    <ul className="library">
      {items.map(x => (
        <LybraryItem
          key={x.name}
          className="library__item"
          title={x.pic}
          tracksAmount={x.amount}
          coverSrc={x.pic}
        />
      ))}
    </ul>
  )
}

export default Library;
