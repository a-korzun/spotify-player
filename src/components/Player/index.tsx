import React, { useContext, useEffect } from 'react';

import Visualizer from '@/components/Visualizer';
import { PlaylistStore } from '@/stores/playlistStore';

import './styles.scss';
import { useState } from 'react';

interface Props {
  name: string;
  id: string;
  url: string;
}

function initAudio(url: string): Promise<HTMLAudioElement> {
  return new Promise((resolve, reject) => {
    if (!url) {
      reject(new Error('preview is not available'));
    }

    const audio = new Audio(url);
    audio.crossOrigin = 'anonymous';

    audio.addEventListener('canplay', () => {
      resolve(audio);
    });
  });
}

function Player({ name, id, url }: Props) {
  const { state, dispatch } = useContext(PlaylistStore);
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [loadingState, setLoadingState] = useState<'idle' | 'pending' | 'done' | 'error'>('idle');

  useEffect(() => {
    const init = async () => {
      setLoadingState('pending');
      try {
        const audio = await initAudio(url);

        setAudio(audio);

        dispatch({ type: 'UPDATE_PLAY_STATE', payload: true });
        audio.play();

        setLoadingState('done');
      } catch (err) {
        console.error(err);

        setLoadingState('error');
      }
    }

    if (state.activeTrackID === id) {
      init();
    } else {
      audio?.pause();
      setAudio(undefined);
    }

    return () => {
      audio?.pause();
      setAudio(undefined);
    }
  }, [state.activeTrackID]);

  const handleTogglePlayState = async () => {
    if (state.activeTrackID !== id) {
      return dispatch({ type: 'UPDATE_ACTIVE_TRACK', payload: { name, id } });
    }

    if (state.isPlaying) {
      dispatch({ type: 'UPDATE_PLAY_STATE', payload: false });
      audio?.pause();
    } else {
      dispatch({ type: 'UPDATE_PLAY_STATE', payload: true });
      audio?.play();
    }
  }

  const handleVisualizationDestroy = async () => {
    setLoadingState('pending');
    try {
      const audio = await initAudio(url);

      setAudio(audio);

      setLoadingState('done');
    } catch (err) {
      console.error(err);

      setLoadingState('error');
    }
  }

  if (loadingState === 'error') {
    return (
      <div className="player">
        <button className="player__button">❌</button>
      </div>
    );
  }

  if (loadingState === 'pending') {
    return (
      <div className="player">
        <button className="player__button">⏳</button>
      </div>
    );
  }


  if (state.isPlaying === true && state.activeTrackID === id) {
    return (
      <div className="player">
        <button className="player__button" onClick={handleTogglePlayState}>⏸</button>
        <Visualizer className="player__visualization" audio={audio} onDestroy={handleVisualizationDestroy}/>
      </div>
    )
  }

  return (
    <div className="player">
      <button className="player__button" onClick={handleTogglePlayState}>▶️</button>
    </div>
  )
}

export default Player;
