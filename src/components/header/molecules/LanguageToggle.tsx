import { Languages } from 'lucide-react';
import { IconButton } from '../atoms';
import { useLanguage } from '@/hooks/useLanguage.ts';

interface LanguageToggleProps {
    className?: string;
}

export function LanguageToggle({ 
  className = ''
}: LanguageToggleProps) {
 const { t, toggleLanguage, currentLanguage } = useLanguage();

  const displayLanguage = currentLanguage.toUpperCase();

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <IconButton
        icon={<Languages className="h-4 w-4" />}
        onClick={toggleLanguage}
        ariaLabel={t("header.languageToggle", {
            currentLanguage: currentLanguage === "fr" ? t("language.en") : t("language.fr")
        })}
        variant="ghost"
      />
      <span className="text-xs font-medium text-foreground/60 min-w-[20px] text-center">
        {displayLanguage}
      </span>
    </div>
  );
}