import { Link, useRouterState } from '@tanstack/react-router';
import type { NavigationMenuProps } from '../types';

export function NavigationMenu({ items, className = '' }: NavigationMenuProps) {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <nav className={`hidden md:flex items-center space-x-6 ${className}`} role="navigation">
      {items.map((item) => {
        const isActive = currentPath === item.href || item.isActive;
        
        return (
          <Link
            key={item.href}
            to={item.href}
            className={`
              relative
              px-3 py-2
              text-sm font-medium
              rounded-2xl
              transition-all duration-200
              hover:bg-white/10 dark:hover:bg-white/5
              ${isActive 
                ? 'text-primary bg-primary/10 dark:bg-primary/20 shadow-sm' 
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100'
              }
            `}
          >
            {item.label}
            {isActive && (
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}