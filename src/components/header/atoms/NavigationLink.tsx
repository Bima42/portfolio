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
		px-4 py-2
		text-base font-medium
		rounded-2xl
		transition-all duration-200
		focus:outline-none
		hover-button
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