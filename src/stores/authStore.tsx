import React, { createContext, useReducer, Dispatch } from 'react';

interface State {
  accessToken: string;
  loadingState: 'idle' | 'pending' | 'done' | 'error';
}

type Actions = { type: 'UPDATE_STATE', payload: State['loadingState'] }
  | { type: 'UPDATE_TOKEN', payload: State['accessToken'] };

const initialState: State = {
  accessToken: '',
  loadingState: 'idle',
};

function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case 'UPDATE_STATE': {
      return { ...state, loadingState: action.payload };
    }
    case 'UPDATE_TOKEN': {
      return { ...state, accessToken: action.payload };
    }
    default: {
      return state;
    }
  }
}

export const AuthStore = createContext<{
  state: State;
  dispatch: Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null
});


export const AuthStoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AuthStore.Provider value={{ state, dispatch }}>{children}</AuthStore.Provider>
}
