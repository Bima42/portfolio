import type { NavigationMenuItem } from '../types';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button.tsx';

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
            await navigate({ to: '/blog', search: { tag: undefined } });
            onClick?.();
        } else {
            if (window.location.pathname !== '/') {
                await navigate({ to: '/' });
            }
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
		focus:outline-none
		border-none
	}
  `;

    const mobileClasses = isMobile ? 'justify-start' : '';
    const desktopClasses = !isMobile ? `text-xs px-3 py-1` : '';

    return (
        <Button
            className={`${baseClasses} ${mobileClasses} ${desktopClasses}`}
            onClick={handleClick}
            variant="ghost"
        >
            <span>{item.label}</span>
        </Button>
    );
}
