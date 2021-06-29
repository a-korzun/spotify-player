import React, { useEffect, useContext, useState } from 'react';

import Track from '@/components/Track';
import { AuthStore } from '@/stores/authStore';
import { PlaylistStore } from '@/stores/playlistStore';
import { fetchTracks } from '@/services/api';
import debounce from '@/debounce';

import './styles.scss';

function Playlist() {
  const [loadingState, setLoadingState] = useState<'idle' | 'pending' | 'done' | 'error'>('idle');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);

  const { activePlaylistID } = useContext(PlaylistStore).state;
  const { accessToken } = useContext(AuthStore).state;


  useEffect(() => {
    const loadTracks = async () => {
      if (!activePlaylistID) {
        return;
      }

      setLoadingState('pending');

      try {
        const { items, limit, total } = await fetchTracks(accessToken, activePlaylistID);

        setTracks(items.map(({ track }) => track));

        setOffset(limit);
        setTotal(total);

        setLoadingState('done');
      } catch (err) {
        setLoadingState('error');
        console.error(err);
      }
    }

    loadTracks();
  }, [activePlaylistID]);

  useEffect(() => {
    const loadMore = debounce(async () => {
      if (loadingState === 'pending') {
        return;
      }

      if (tracks.length >= total) {
        return;
      }

      setLoadingState('pending');

      try {
        const { items, limit } = await fetchTracks(accessToken, activePlaylistID, offset);

        setTracks([...tracks, ...items.map(({ track }) => track)]);
        setOffset(offset + limit);
        setLoadingState('done');
      } catch (err) {
        console.error(err);
        setLoadingState('error');
      }
    }, 500);

    const handleScroll = (event: Event) => {
      const { scrollTop, clientHeight,  scrollHeight } = document.documentElement;

      if ((scrollTop + clientHeight) === scrollHeight) {
        loadMore();
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  })

  const list = tracks.map((track, index) => (
    <Track
      className="playlist__track"
      key={track.id}
      index={index + 1}
      track={track}
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

export default Playlist;
