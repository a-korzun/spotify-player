import React from 'react';

import Track from '@/components/Track';

import './styles.scss';

function Playlist () {
  const tracks = Array.from({ length: 99 }, (el, index) => ({
    index,
    artists: index % 2 === 0 ? [{ name: 'foo', id: 'foo' }] : [{ name: 'foo', id: 'foo' }, { name: 'bar bzz', id: 'bar bzz' }],
    duration: Math.floor(Math.random() * 10) * 1000 * 60,
    name: 'track name track name track name',
  }));

  return (
    <ul className="playlist">
      {tracks.map(x => (
        <Track
          className="playlist__track"
          key={x.index}
          index={x.index}
          artists={x.artists}
          duration={x.duration}
          name={x.name}
        />
      ))}
    </ul>
  )
}

export default Playlist;
