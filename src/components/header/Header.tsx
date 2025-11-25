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
        { label: t('navigation.contact'), id: 'contact' },
        { label: t('navigation.blog'), id: 'blog' },
    ];

    return (
        <header
            className="
              fixed
              top-4 left-4 right-4 md:left-12 md:right-12
              max-w-full
              z-100
             "
        >
            <div className="flex items-center justify-between px-6 py-3 rounded-md border glass-background">
                <HeaderLogo />

                {!isMobile && <DesktopNavigation items={defaultNavigation} />}

                <HeaderControls navigationItems={defaultNavigation} />
            </div>
        </header>
    );
}
