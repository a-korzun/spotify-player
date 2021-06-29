import React from 'react';

import './styles.scss';

interface Props {
  preview: PlaylistPreview;
  onClick: () => void;
  className?: string;
}

function LibraryItem({ preview, onClick, className }: Props) {
  return (
    <li
      className={`library-item ${className}`}
      role="button"
      tabIndex={0}
      onClick={onClick}
    >
      <div
        className="library-item__cover"
        style={{ backgroundImage: `url(${preview.images[0].url})` }}
      >
        <span className="library-item__badge">{preview.tracks.total}</span>
        <div className="library-item__footer">
          <h3 className="library-item__title">{preview.name}</h3>
        </div>
      </div>
    </li>
  )
}

export default LibraryItem;