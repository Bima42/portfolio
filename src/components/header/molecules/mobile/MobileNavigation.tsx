import { NavigationLink } from '../../atoms/NavigationLink.tsx';
import type { NavigationMenuItem } from '../../types.ts';

interface MobileNavigationProps {
    navigationItems: NavigationMenuItem[];
    onItemClick: () => void;
}

export function MobileNavigation({
    navigationItems,
    onItemClick,
}: MobileNavigationProps) {
    return (
        <nav
            className="
                flex flex-col
                flex-1
                px-4 py-6
                space-y-2
                overflow-y-auto
            "
            role="navigation"
            aria-label="Mobile navigation"
        >
            {navigationItems.map(item => (
                <NavigationLink
                    key={item.id}
                    item={item}
                    onClick={onItemClick}
                    isMobile={true}
                />
            ))}
        </nav>
    );
}
