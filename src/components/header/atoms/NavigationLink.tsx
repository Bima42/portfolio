import { Link, useRouterState } from '@tanstack/react-router';
import type { NavigationMenuItem } from '../types';

interface NavigationLinkProps {
	item: NavigationMenuItem;
	onClick?: () => void;
	isMobile?: boolean;
}

export function NavigationLink({ item, onClick, isMobile = false }: NavigationLinkProps) {
	const router = useRouterState();
	const currentPath = router.location.pathname;
	const isActive = currentPath === item.href || item.isActive;

	const baseClasses = `
    relative
    px-4 py-3
    text-base font-medium
    rounded-2xl
    transition-all duration-200
    hover:bg-white/10 dark:hover:bg-white/5
    focus:outline-none focus:ring-2 focus:ring-primary/50
    ${isActive
		? 'text-primary bg-primary/10 dark:bg-primary/20 shadow-sm border border-primary/20'
		: 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100'
	}
  `;

	const mobileClasses = isMobile ? 'w-full justify-start' : '';
	const desktopClasses = !isMobile ? 'text-sm px-3 py-2' : '';

	return (
		<Link
			to={item.href}
			className={`${baseClasses} ${mobileClasses} ${desktopClasses}`}
			onClick={onClick}
		>
      <span className="flex items-center gap-3">
        {item.icon && (
			<span className="w-5 h-5 flex-shrink-0">
            {item.icon}
          </span>
		)}
		  {item.label}
      </span>
			{isActive && !isMobile && (
				<span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary rounded-full" />
			)}
			{isActive && isMobile && (
				<span className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
			)}
		</Link>
	);
}