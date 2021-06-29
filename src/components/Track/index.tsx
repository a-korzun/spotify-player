import React, { useState, useContext } from 'react';

import Modal from '@/components/Modal';
import Player from '@/components/Player';
import { fetchArtists } from '@/services/api';
import { AuthStore } from '@/stores/authStore';


import './styles.scss';

interface Props {
  index: number;
  track: Track;
  className?: string;
}

function Track({ index, track, className }: Props) {
  const [loadingState, setLoadingState] = useState<'idle' | 'pending' | 'done' | 'error'>('idle');
  const [artists, setArtists] = useState<Artist[]>([]);
  const [infoOpen, setInfoOpen] = useState<boolean>(false);

  const { accessToken } = useContext(AuthStore).state;

  const loadArtists  = async (ids: string[]) => {
    setInfoOpen(true);

    setLoadingState('pending');
    try {
      const { artists } = await fetchArtists(accessToken, ids);
      setArtists(artists.map(({ id, name, genres }) => ({ id, name, genres })));

      setLoadingState('done');
    } catch (err) {
      setLoadingState('error');
      console.error(err);
    }
  };

  const handleArtistClick = () => {
    loadArtists(track.artists.map(x => x.id));
  };

  return (
    <li className={`track ${className}`}>
      <div className="track__number">{index}</div>
      <div className="track__player"><Player name={track.name} id={track.id} url={track.preview_url} /></div>
      <div className="track__name">{track.name}</div>
      <div
        className="track__artist"
        onClick={handleArtistClick}
      >
        {track.artists.map(x => x.name).join(' & ')}
      </div>
      <div className="track__duration">{formatDuration(track.duration_ms)}</div>

      <Modal open={infoOpen} onClose={() => setInfoOpen(false)}>
        {loadingState === 'pending' && <span>Loading...</span>}
        {loadingState === 'error' && <span>Something went wring</span>}
        {loadingState === 'done' && artists.map(artist => <ArtistDescription key={artist.id} artist={artist} />)}
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

function formatDuration(ms: number): string {
  const leadZero = (x: string) => {
    return x.length === 1 ? x.padStart(2, '0') : x;
  }

  const durationInSec = ms / 1000;

  const minutes = String(Math.floor(durationInSec / 60));
  const seconds = String(Math.floor(durationInSec % 60));

  return `${leadZero(minutes)}:${leadZero(seconds)}`;
}

export default Track;
