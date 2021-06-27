import React from 'react';

import Header from '@/components/Header';
import Library from '@/components/Library';
import Playlist from '@/components/Playlist';

import './styles.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <Library />
      <Playlist />
    </div>
  );
}

export default App;
