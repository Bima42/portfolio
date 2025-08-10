import { Link } from '@tanstack/react-router';

interface LogoProps {
    src?: string;
    alt?: string;
    text?: string;
    className?: string;
    logoHeight?: string;
    href?: string;
}

export function Logo({
    src = '/logos/logo-no-bg.svg',
    logoHeight,
    alt = 'Logo',
    className = '',
    href,
}: LogoProps) {
    if (!href) {
        return (
            <div
                className={`flex items-center space-x-2 transition-opacity hover:opacity-80 ${className}`}
            >
                <img
                    src={src}
                    alt={alt}
                    className={`${logoHeight ? logoHeight : 'h-12'} w-auto ${className}`}
                />
            </div>
        );
    }
    return (
        <Link
            to={href}
            className={`flex items-center space-x-2 transition-opacity hover:opacity-80 ${className}`}
        >
            <img
                src={src}
                alt={alt}
                className={`${logoHeight ? logoHeight : 'h-12'} w-auto`}
            />
        </Link>
    );
}
