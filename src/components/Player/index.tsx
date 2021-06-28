import React from 'react';
import { observer } from 'mobx-react-lite';

import Visualizer from '@/components/Visualizer';

import playerStore from '@/stores/playerStore';

import './styles.scss';

interface Props {
  name: string;
  id: string;
}

function Player({ name, id }: Props) {
  const playState = playerStore.playState;

  const handleTogglePlayState = async () => {
    if (playerStore.trackID !== id) {
      await playerStore.initAudio(id, name);

      return playerStore.play();
    }

    if (playState === 'play') {
      playerStore.pause();
    } else {
      playerStore.play();
    }
  }

  return (
    <div className="player">
      <button className="player__button" onClick={handleTogglePlayState}>
        {playState === 'play' && playerStore.trackID === id ? '⏸' : '▶️'}
      </button>
      {playState === 'play' && playerStore.trackID === id && <Visualizer className="player__visualization" />}
    </div>
  )
}

export default observer(Player);
