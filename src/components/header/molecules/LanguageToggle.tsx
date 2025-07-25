import { Languages } from 'lucide-react';
import { IconButton } from '../atoms';
import type { LanguageToggleProps } from '../types';

export function LanguageToggle({ 
  currentLanguage, 
  onLanguageChange, 
  className = '' 
}: LanguageToggleProps) {
  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'fr' ? 'en' : 'fr';
    onLanguageChange(newLanguage);
  };

  const displayLanguage = currentLanguage.toUpperCase();

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <IconButton
        icon={<Languages className="h-4 w-4" />}
        onClick={toggleLanguage}
        ariaLabel={`Switch to ${currentLanguage === 'fr' ? 'English' : 'French'}`}
        variant="ghost"
      />
      <span className="text-xs font-medium text-foreground/60 min-w-[20px] text-center">
        {displayLanguage}
      </span>
    </div>
  );
}