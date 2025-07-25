import { Moon, Sun } from 'lucide-react';
import { IconButton } from '../atoms';
import type { ThemeToggleProps } from '../types';

export function ThemeToggle({ 
  currentTheme, 
  onToggle, 
  className = '' 
}: ThemeToggleProps) {
  const isLight = currentTheme === 'light';
  
  return (
    <IconButton
      icon={isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      onClick={onToggle}
      ariaLabel={`Switch to ${isLight ? 'dark' : 'light'} theme`}
      variant="ghost"
      className={className}
    />
  );
}