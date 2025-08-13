import { Moon, Sun } from 'lucide-react';
import { IconButton } from '../../atoms';

import { useTheme } from '@/hooks/useTheme.tsx';

interface ThemeToggleProps {
    className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
    const { toggleTheme, isDark } = useTheme();

    return (
        <IconButton
            icon={
                !isDark ? (
                    <Moon className="h-4 w-4" />
                ) : (
                    <Sun className="h-4 w-4" />
                )
            }
            onClick={toggleTheme}
            ariaLabel={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            variant="ghost"
            className={className}
        />
    );
}
