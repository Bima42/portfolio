import { IconButton } from '../atoms';
import { useLanguage } from '@/hooks/useLanguage.ts';

interface LanguageToggleProps {
    className?: string;
}

export function LanguageToggle({ className = '' }: LanguageToggleProps) {
    const { t, toggleLanguage, currentLanguage } = useLanguage();

    const displayLanguage = currentLanguage.toUpperCase();

    return (
        <div className={`flex items-center space-x-1 ${className}`}>
            <IconButton
                icon={displayLanguage}
                onClick={toggleLanguage}
                ariaLabel={t('header.languageToggle', {
                    currentLanguage:
                        currentLanguage === 'fr'
                            ? t('language.en')
                            : t('language.fr'),
                })}
                variant="ghost"
                className={'text-xs'}
            />
        </div>
    );
}
