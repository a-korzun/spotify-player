import React, { createContext, useReducer } from 'react';

interface State {
  activePlaylistID: string;
  activeTrackID?: string;
  activeTrackName?: string;
  isPlaying: boolean;
}

type Actions = { type: 'UPDATE_PLAYLIST_ID', payload: State['activePlaylistID'] }
  | { type: 'UPDATE_ACTIVE_TRACK', payload: { name: string, id: string } }
  | { type: 'UPDATE_PLAY_STATE', payload: State['isPlaying'] }

const initialState: State = {
  activePlaylistID: '',
  activeTrackID: undefined,
  activeTrackName: undefined,
  isPlaying: false
};

export const PlaylistStore = createContext<{
  state: State,
  dispatch: React.Dispatch<Actions>
}>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'UPDATE_PLAYLIST_ID': {
      return { ...state, activePlaylistID: action.payload };
    }
    case 'UPDATE_ACTIVE_TRACK': {
      return {
        ...state,
        activeTrackID: action.payload.id,
        activeTrackName: action.payload.name,
      };
    }
    case 'UPDATE_PLAY_STATE': {
      return { ...state, isPlaying: action.payload };
    }
    default: {
      return state;
    }
  }
}

export const PlaylistStoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <PlaylistStore.Provider value={{ state, dispatch }}>{children}</PlaylistStore.Provider>
}
