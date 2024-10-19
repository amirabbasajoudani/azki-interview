import React, { createContext } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const contextFactory = <T extends {}>() => {
  const Context = createContext<T | undefined>(undefined);
  const useContext = () => {
    const ctx = React.useContext(Context);
    if (ctx === undefined) {
      throw new Error('useContext must be inside a Provider with a value');
    }
    return ctx;
  };
  return [useContext, Context] as const;
};

export default contextFactory;
