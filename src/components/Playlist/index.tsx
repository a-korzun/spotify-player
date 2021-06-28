import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Track from '@/components/Track';

import tracksStore from '@/stores/tracksStore';

import './styles.scss';

function Playlist() {
  const tracks = tracksStore.tracks;
  const loadingState = tracksStore.state;

  const handleScroll = (event: Event) => {
    const { scrollTop, clientHeight,  scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight === scrollHeight) {
      tracksStore.loadMore();
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const list = tracks.map((x, index) => (
    <Track
      className="playlist__track"
      key={x.id}
      index={index + 1}
      artists={x.artists}
      duration={x.duration}
      name={x.name}
      id={x.id}
    />
  ));

  return (
    <ul className="playlist">
      {loadingState === 'idle' && <div className="playlist__placeholder">Select playlist to load tracks</div>}
      {loadingState === 'pending' && <div className="playlist__placeholder">Loading...</div>}
      {loadingState === 'error' && <div className="playlist__placeholder">Error</div>}
      {list.length > 0 && list}
    </ul>
  )
}

export default observer(Playlist);
