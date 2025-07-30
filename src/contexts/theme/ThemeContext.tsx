import { createContext } from 'react';

export type Theme = 'light' | 'dark';

type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
    isDark: boolean;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
    undefined
);
