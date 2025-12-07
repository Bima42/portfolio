import { GithubButton } from '@/components/header/molecules/icon-buttons/GithubButton.tsx';
import { LinkedInButton } from '@/components/header/molecules/icon-buttons/LinkedInButton.tsx';
import { useLanguage } from '@/hooks/useLanguage.ts';
import { CVButton } from '@/components/header/molecules/icon-buttons/CVButton.tsx';

export function MobileSocialButtons() {
    const { t } = useLanguage();
    return (
        <div className="border-t border-foreground/10 bg-foreground/5 p-6 space-y-4">
            <div className="text-center">
                <span className="text-xs font-medium text-foreground/70 uppercase tracking-wider">
                    {t('header.connectAndDownload')}
                </span>
            </div>

            <div className="flex flex-col justify-center space-y-4 px-6">
                <GithubButton />
                <LinkedInButton />
                <CVButton />
            </div>
        </div>
    );
}
