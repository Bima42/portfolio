import { VerticalDivider } from '../../atoms';
import { LanguageToggle, ThemeToggle } from '../index.ts';
import { useLanguage } from '@/hooks/useLanguage.ts';

export function MobileControls() {
    const { t } = useLanguage();

    return (
        <div
            className="
                border-t border-foreground/10 dark:border-foreground/20
                bg-foreground/5 dark:bg-foreground/10
                p-6
            "
        >
            <div className="flex items-center justify-center space-x-6">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-foreground/70 dark:text-foreground/60">
                        {t('header.theme')}
                    </span>
                    <ThemeToggle />
                </div>

                <VerticalDivider
                    height="h-6"
                    className="bg-foreground/20 dark:bg-foreground/30"
                />

                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-foreground/70 dark:text-foreground/60">
                        {t('header.language')}
                    </span>
                    <LanguageToggle />
                </div>
            </div>
        </div>
    );
}
