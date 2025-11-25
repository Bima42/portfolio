import { MobileMenu } from '../molecules/mobile/MobileMenu.tsx';
import type { NavigationMenuItem } from '../types.ts';
import { useIsMobile } from '@/hooks/useIsMobile.tsx';
import { DesktopControls } from '@/components/header';

interface HeaderControlsProps {
    navigationItems: NavigationMenuItem[];
}

export function HeaderControls({ navigationItems }: HeaderControlsProps) {
    const isMobile = useIsMobile();
    return (
        <div className="flex items-center space-x-3">
            {!isMobile && <DesktopControls />}
            {isMobile && <MobileMenu navigationItems={navigationItems} />}
        </div>
    );
}
