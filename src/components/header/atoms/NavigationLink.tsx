import type { NavigationMenuItem } from '../types';

interface NavigationLinkProps {
	item: NavigationMenuItem;
	onClick?: () => void;
	isMobile?: boolean;
}

export function NavigationLink({ item, onClick, isMobile = false }: NavigationLinkProps) {

	const handleClick = () => {
		const element = document.getElementById(item.id);
		if (element) {
			element.scrollIntoView({ 
				behavior: 'smooth',
				block: 'start'
			});
		}
		onClick?.();
	};

	const baseClasses = `
    relative
    px-4 py-3
    text-base font-medium
    rounded-2xl
    transition-all duration-200
    hover:bg-white/10 dark:hover:bg-white/5
    focus:outline-none
	text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100
	}
  `;

	const mobileClasses = isMobile ? 'justify-start' : '';
	const desktopClasses = !isMobile ? `text-sm px-3 py-2` : '';

	return (
		<button
			type="button"
			className={`${baseClasses} ${mobileClasses} ${desktopClasses}`}
			onClick={handleClick}
		>
		  <span>
			  {item.label}
		  </span>
		</button>
	);
}