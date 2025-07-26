import { NavigationLink } from '../atoms/NavigationLink';
import type { NavigationMenuItem } from '../types';

interface NavigationMenuProps {
  items: NavigationMenuItem[];
  className?: string;
}

export function NavigationMenu({ items, className = '' }: NavigationMenuProps) {
  return (
      <nav
          className={`hidden md:flex items-center space-x-2 ${className}`}
          role="navigation"
          aria-label="Main navigation"
      >
        {items.map((item) => (
            <NavigationLink
                key={item.href}
                item={item}
                isMobile={false}
            />
        ))}
      </nav>
  );
}