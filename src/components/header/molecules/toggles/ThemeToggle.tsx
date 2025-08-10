import { Moon, Sun } from 'lucide-react';
import { IconButton } from '../../atoms';

import { useTheme } from '@/hooks/useTheme.tsx';

interface ThemeToggleProps {
    className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
    const { theme, toggleTheme } = useTheme();
    const isLight = theme === 'light';

    return (
        <IconButton
            icon={
                isLight ? (
                    <Moon className="h-4 w-4" />
                ) : (
                    <Sun className="h-4 w-4" />
                )
            }
            onClick={toggleTheme}
            ariaLabel={`Switch to ${isLight ? 'dark' : 'light'} theme`}
            variant="ghost"
            className={className}
        />
    );
}
