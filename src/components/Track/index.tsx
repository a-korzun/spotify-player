import React, { useState } from 'react';
import cx from 'classnames';

import Modal from '@/components/Modal';

import './styles.scss';
interface Props {
  index: number;
  artists: Artist[];
  duration: number;
  name: string;
  className?: string;
}

function Track({ index, artists, duration, name, className }: Props) {
  const [infoOpen, setInfoOpen] = useState<boolean>(false);

  const artist = artists.map(x => x.name).join(' & ');

  return (
    <li className={cx('track', className)}>
      <div className="track__col track__number">{index}</div>
      <div className="track__col track__player">{'play'}</div>
      <div className="track__col track__name">{name}</div>
      <div
        className="track__col track__artist"
        onClick={() => setInfoOpen(true)}
      >{artist}</div>
      <div className="track__col track__duration">{duration / 1000 / 60}</div>

      <Modal open={infoOpen} onClose={() => setInfoOpen(false)}>
        {artist}
      </Modal>
    </li>
  )
}

export default Track;
