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
    focus:outline-none
    ${isActive
		? 'text-primary bg-primary/10 dark:bg-primary/20 shadow-sm'
		: 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100'
	}
  `;

	const mobileClasses = isMobile ? 'justify-start' : '';
	const desktopClasses = !isMobile ? `text-sm px-3 py-2` : '';

	return (
		<Link
			to={item.href}
			className={`${baseClasses} ${mobileClasses} ${desktopClasses}`}
			onClick={onClick}
		>
		  <span>
			  {item.label}
		  </span>
		</Link>
	);
}