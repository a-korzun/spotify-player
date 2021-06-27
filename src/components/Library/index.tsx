import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import LybraryItem from '@/components/LibraryItem';

import playlistStore from '@/stores/playlistStore';
import tracksStore from '@/stores/tracksStore';

import './styles.scss';

function Library() {
  const playlists = playlistStore.playlists;
  const loadingState = playlistStore.state;

  useEffect(() => {
    playlistStore.loadPlaylists();
  }, []);

  const list = playlists.map(x => (
    <LybraryItem
      className="library__item"
      key={x.id}
      title={x.name}
      tracksAmount={x.tracksAmount}
      coverSrc={x.picture}
      onClick={() => tracksStore.loadTracks(x.id)}
    />
  ));

  return (
    <ul className="library">
      {loadingState === 'pending' && <div className="library__placeholder">Loading...</div>}
      {loadingState === 'error' && <div className="library__placeholder">Something went wrong</div>}
      {loadingState === 'done' && list}
    </ul>
  );
}

export default observer(Library);
