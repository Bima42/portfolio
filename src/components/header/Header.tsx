import { useLanguage } from '@/hooks/useLanguage';
import { HeaderLogo } from './molecules/HeaderLogo';
import { HeaderControls } from './organisms/HeaderControls.tsx';
import type { NavigationMenuItem } from './types';
import { useIsMobile } from '@/hooks/useIsMobile.tsx';
import { DesktopNavigation } from '@/components/header/molecules';

export function Header() {
    const { t } = useLanguage();
    const isMobile = useIsMobile();

    const defaultNavigation: NavigationMenuItem[] = [
        { label: t('navigation.projects'), id: 'projects' },
        // { label: t('navigation.blog'), id: 'blog' },
        { label: t('navigation.contact'), id: 'contact' },
    ];

    return (
        <header className="fixed w-full z-100">
            <div className="flex items-center justify-between px-4 py-3 space-x-3 glass-background">
                <div className="mr-8">
                    <HeaderLogo />
                </div>

                {!isMobile && <DesktopNavigation items={defaultNavigation} />}

                <HeaderControls navigationItems={defaultNavigation} />
            </div>
        </header>
    );
}
