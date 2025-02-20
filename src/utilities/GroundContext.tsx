import React, { createContext, useContext, useState } from 'react';

type GroundContextType = {
  isOnGround: boolean;
  setIsOnGround: (value: boolean) => void;
};

const GroundContext = createContext<GroundContextType | undefined>(undefined);

export const GroundProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOnGround, setIsOnGround] = useState(false);

  return (
    <GroundContext.Provider value={{ isOnGround, setIsOnGround }}>
      {children}
    </GroundContext.Provider>
  );
};

export const useGround = () => {
  const context = useContext(GroundContext);
  if (!context) {
    throw new Error('useGround must be used within a GroundProvider');
  }
  return context;
};
