import React from 'react';

import Header from '@/components/Header';
import Library from '@/components/Library';

import './styles.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <Library />
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
