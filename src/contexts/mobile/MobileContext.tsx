import { createContext } from 'react';

type MobileContextType = boolean;

export const MobileContext = createContext<MobileContextType | undefined>(
    undefined
);
