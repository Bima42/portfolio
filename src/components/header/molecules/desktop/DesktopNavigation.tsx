import { NavigationLink } from '../../atoms/NavigationLink.tsx';
import type { NavigationMenuItem } from '../../types.ts';

interface DesktopNavigationProps {
    items: NavigationMenuItem[];
    className?: string;
}

export function DesktopNavigation({
    items,
    className = '',
}: DesktopNavigationProps) {
    return (
        <nav
            className={`flex items-center space-x-2 ${className}`}
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
