interface HeaderIconButtonLayoutProps {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    target?: string;
    rel?: string;
    ariaLabel?: string;
    className?: string;
    download?: string;
}

export function HeaderIconButtonLayout({
    children,
    onClick,
    href,
    target,
    rel,
    ariaLabel,
    className = '',
    download,
}: HeaderIconButtonLayoutProps) {
    const baseClasses = `
        flex items-center justify-center space-x-2 px-4 py-2
        rounded-full glass-background shadow-sm
        transition-all duration-200
        text-xs font-medium hover-button
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        sm:justify-start
        ${className}
    `;

    if (href) {
        return (
            <a
                href={href}
                target={target}
                rel={rel}
                aria-label={ariaLabel}
                download={download}
                className={baseClasses}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            onClick={onClick}
            aria-label={ariaLabel}
            className={baseClasses}
        >
            {children}
        </button>
    );
}
