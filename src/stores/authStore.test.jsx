import React, { useContext, useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import { AuthStore, AuthStoreProvider } from './authStore';

describe('AuthStore', () => {
  test('intial state', () => {
    render(
      <AuthStore.Consumer>
        {(state) => (
          <>
            <span data-testid="accessToken">{state.accessToken}</span>
            <span data-testid="loadingState">{state.loadingState}</span>
          </>
        )}
      </AuthStore.Consumer>
    );

    expect(screen.getByTestId('accessToken').textContent).toEqual('');
    expect(screen.getByTestId('loadingState').textContent).toEqual('');
  });

  test('provide token', async () => {
    const Comp = () => {
      const { state, dispatch } = useContext(AuthStore);

      useEffect(() => {
        dispatch({ type: 'UPDATE_STATE', payload: 'done' });
        dispatch({ type: 'UPDATE_TOKEN', payload: 'token' });
      }, [])

      return (
        <>
          <span data-testid="accessToken">{state.accessToken}</span>
          <span data-testid="loadingState">{state.loadingState}</span>
        </>
      )
    }

    render(
      <AuthStoreProvider>
        <Comp />
      </AuthStoreProvider>
    );

    expect(screen.getByTestId('accessToken').textContent).toEqual('token');
    expect(screen.getByTestId('loadingState').textContent).toEqual('done');
  });
});
