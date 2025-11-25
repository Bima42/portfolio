import { NavigationLink } from '../../atoms/NavigationLink.tsx';
import type { NavigationMenuItem } from '@/components/header';

interface DesktopNavigationProps {
    items: NavigationMenuItem[];
}

export function DesktopNavigation({ items }: DesktopNavigationProps) {
    return (
        <nav
            className={'flex items-center space-x-2 flex-1 justify-center'}
            role="navigation"
            aria-label="Main navigation"
        >
            {items.map((item, index) => (
                <NavigationLink
                    key={`${item.id}_${index}`}
                    item={item}
                    isMobile={false}
                />
            ))}
        </nav>
    );
}
