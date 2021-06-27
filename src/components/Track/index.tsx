import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import cx from 'classnames';

import Modal from '@/components/Modal';
import artistsStore from '@/stores/artistsStore';

import './styles.scss';

interface Props {
  index: number;
  artists: Track['artists'];
  duration: number;
  name: string;
  className?: string;
}

function formatDuration(ms: number): string {
  const leadZero = (x: string) => {
    return x.length === 1 ? x.padStart(2, '0') : x;
  }

  const durationInSec = ms / 1000;

  const minutes = String(Math.floor(durationInSec / 60));
  const seconds = String(Math.floor(durationInSec % 60));

  return `${leadZero(minutes)}:${leadZero(seconds)}`;
}

function Track({ index, artists, duration, name, className }: Props) {
  const [infoOpen, setInfoOpen] = useState<boolean>(false);

  const loadingState = artistsStore.state;
  const artistsMeta = artistsStore.artists;

  const handleArtistClick = () => {
    setInfoOpen(true);
    artistsStore.loadArtists(artists.map(x => x.id));
  }

  return (
    <li className={cx('track', className)}>
      <div className="track__col track__number">{index}</div>
      <div className="track__col track__player">{'play'}</div>
      <div className="track__col track__name">{name}</div>
      <div
        className="track__col track__artist"
        onClick={handleArtistClick}
      >
        {artists.map(x => x.name).join(' & ')}
      </div>
      <div className="track__col track__duration">{formatDuration(duration)}</div>

      <Modal open={infoOpen} onClose={() => setInfoOpen(false)}>
        {loadingState === 'pending' && <span>Loading...</span>}
        {loadingState === 'error' && <span>Something went wring</span>}
        {loadingState === 'done' && artistsMeta.map(artist => <ArtistDescription key={artist.id} artist={artist} />)}
      </Modal>
    </li>
  )
}

function ArtistDescription({ artist }: { artist: Artist }) {
  return (
    <ul>
      <li>Name: {artist.name}</li>
      <li>Genres: {artist.genres.join(', ')}</li>
    </ul>
  );
}

export default observer(Track);
