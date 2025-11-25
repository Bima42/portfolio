import type { NavigationMenuItem } from '../types';
import { useNavigate } from '@tanstack/react-router';

interface NavigationLinkProps {
    item: NavigationMenuItem;
    onClick?: () => void;
    isMobile?: boolean;
}

export function NavigationLink({
    item,
    onClick,
    isMobile = false,
}: NavigationLinkProps) {
    const navigate = useNavigate();

    const handleClick = async () => {
        // Navigate if it's blog
        if (item.id === 'blog') {
            await navigate({ to: '/blog' });
            onClick?.();
        } else {
            const element = document.getElementById(item.id);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
            onClick?.();
        }
    };

    const baseClasses = `
		relative
		px-4 py-2
		text-base font-medium
		rounded-md
		transition-all duration-200
		focus:outline-none
		hover-button
		border-none
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
            <span>{item.label}</span>
        </button>
    );
}
