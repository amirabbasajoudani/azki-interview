'use client';
import React, { Dispatch, PropsWithChildren, useReducer } from 'react';
import contextFactory from '@/utils/contextFactory';

type InsuranceState = {
  carType: string;
  carModel: string;
  previousCompany: string;
  thirdPartyDiscount: string;
  accidentsDiscount: string;
};
const [useInsurance, InsuranceContext] = contextFactory<InsuranceState>();

export const useInsuranceContext = useInsurance;

const [useDispatch, InsuranceDispatchContext] =
  contextFactory<Dispatch<InsuranceAction>>();

export const useInsuranceDispatch = useDispatch;

type InsuranceAction = {
  type: 'add';
  payload: {
    carType?: string;
    carModel?: string;
    previousCompany?: string;
    thirdPartyDiscount?: string;
    accidentsDiscount?: string;
  };
};

const initialState: InsuranceState = {
  carType: '',
  carModel: '',
  previousCompany: '',
  thirdPartyDiscount: '',
  accidentsDiscount: '',
};

export function handleUpdateInsurance(
  dispatch: Dispatch<InsuranceAction>,
  payload: InsuranceAction['payload']
) {
  dispatch({
    type: 'add',
    payload: {
      ...payload,
    },
  });
}

function insuranceReducer(
  state: InsuranceState,
  action: InsuranceAction
): InsuranceState {
  const type = action.type;
  switch (type) {
    case 'add': {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      throw Error('Unknown action');
    }
  }
}

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [auth, dispatch] = useReducer(insuranceReducer, initialState);
  return (
    <InsuranceContext.Provider value={auth}>
      <InsuranceDispatchContext.Provider value={dispatch}>
        {children}
      </InsuranceDispatchContext.Provider>
    </InsuranceContext.Provider>
  );
};

export default AuthProvider;
