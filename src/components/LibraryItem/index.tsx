import React from 'react';
import cx from 'classnames';

import './styles.scss';

interface Props {
  title: string;
  tracksAmount: number;
  coverSrc: string;
  onClick: () => void;
  className?: string;
}

function LibraryItem({ title, tracksAmount, coverSrc, onClick, className }: Props) {
  return (
    <li
      className={cx('library-item', className)}
      role="button"
      tabIndex={0}
      onClick={onClick}
    >
      <div
        className="library-item__cover"
        style={{ backgroundImage: `url(${coverSrc})` }}
      >
        <span className="library-item__badge">{tracksAmount}</span>
        <div className="library-item__footer">
          <h3 className="library-item__title">{title}</h3>
        </div>
      </div>
    </li>
  )
}

export default LibraryItem;