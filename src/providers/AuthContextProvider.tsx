'use client';
import React, { Dispatch, PropsWithChildren, useReducer } from 'react';
import contextFactory from '@/utils/contextFactory';

const [useAuth, AuthContext] = contextFactory<AuthState>();

export const useAuthContext = useAuth;

const [useDispatch, AuthDispatchContext] =
  contextFactory<Dispatch<AuthAction>>();

export const useAuthDispatch = useDispatch;

type AuthState = {
  firstName: string;
  lastName: string;
  role: 'manager' | '';
};

type AuthAction =
  | {
      type: 'add';
      firstName: string;
      lastName: string;
      role: 'manager';
    }
  | { type: 'delete' };

const initialState: AuthState = {
  firstName: '',
  lastName: '',
  role: '',
};

export function handleAddAuth(
  dispatch: Dispatch<AuthAction>,
  payload: { firstName: string; lastName: string; role: 'manager' }
) {
  dispatch({
    type: 'add',
    firstName: payload.firstName,
    lastName: payload.lastName,
    role: payload.role,
  });
}

export function handleDeleteAuth(dispatch: Dispatch<AuthAction>) {
  dispatch({
    type: 'delete',
  });
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'add': {
      return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName,
        role: action.role,
      };
    }
    case 'delete': {
      return { ...initialState };
    }
    default: {
      throw Error('Unknown action');
    }
  }
}

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [auth, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={auth}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
