import React from 'react';
import { observer } from 'mobx-react-lite';

import Track from '@/components/Track';

import tracksStore from '@/stores/tracksStore';

import './styles.scss';

function Playlist() {
  const tracks = tracksStore.tracks;
  const loadingState = tracksStore.state;

  const list = tracks.map(x => (
    <Track
      className="playlist__track"
      key={x.id}
      index={x.index}
      artists={x.artists}
      duration={x.duration}
      name={x.name}
    />
  ));

  return (
    <ul className="playlist">
      {loadingState === 'idle' && <div className="playlist__placeholder">Select playlist to load tracks</div>}
      {loadingState === 'pending' && <div className="playlist__placeholder">Loading...</div>}
      {loadingState === 'error' && <div className="playlist__placeholder">Error</div>}
      {loadingState === 'done' && list}
    </ul>
  )
}

export default observer(Playlist);
