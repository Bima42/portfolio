import { useEffect, useState } from 'react';
import { useMedia } from 'react-use';

type Theme = 'light' | 'dark';

export function useTheme() {
    const prefersDark = useMedia('(prefers-color-scheme: dark)');

    const [theme, setThemeState] = useState<Theme>(() => {
        if (typeof window === 'undefined') return 'light';
        const stored = localStorage.getItem('theme') as Theme | null;
        return stored || (prefersDark ? 'dark' : 'light');
    });

    useEffect(() => {
        const root = document.documentElement;

        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        localStorage.setItem('theme', theme);
    }, [theme]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
    };

    const toggleTheme = () => {
        setThemeState(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return {
        theme,
        setTheme,
        toggleTheme,
        isDark: theme === 'dark',
    };
}
