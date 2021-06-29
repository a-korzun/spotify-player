import React, { useContext, useEffect } from 'react';

import Header from '@/components/Header';
import Library from '@/components/Library';
import Playlist from '@/components/Playlist';

import { AuthStoreProvider, AuthStore } from '@/stores/authStore';
import { PlaylistStoreProvider } from '@/stores/playlistStore';
import { retrieveAccessToken } from '@/services/api';

import './styles.scss';

function App() {
  return (
    <AuthStoreProvider>
      <PlaylistStoreProvider>
        <Layout />
      </PlaylistStoreProvider>
    </AuthStoreProvider>
  );
}

export function Layout() {
  const { state: authState, dispatch } = useContext(AuthStore);

  useEffect(() => {
    const init = async () => {
      dispatch({ type: 'UPDATE_STATE', payload: 'pending' });
      const token = await retrieveAccessToken();
      dispatch({ type: 'UPDATE_TOKEN', payload: token });
      dispatch({ type: 'UPDATE_STATE', payload: 'done' });
    }

    init();
  }, []);

  return (
    <div className="app">
      <Header />
      {authState.loadingState === 'pending' && <span key="pending">Authentication...</span>}
      {authState.loadingState === 'done' && <Library />}
      <Playlist />
      {authState.loadingState === 'error' && <span key="error">Authentication failed</span>}
    </div>
  )
}

export default App;
