import { Button } from '@/components/ui/button.tsx';

interface IconButtonProps {
    icon: React.ReactNode | string;
    onClick?: () => void;
    ariaLabel: string;
    variant?: 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function IconButton({
    icon,
    onClick,
    ariaLabel,
    variant = 'ghost',
    size = 'md',
    className = '',
}: IconButtonProps) {
    const sizeClasses = {
        sm: 'h-8 w-8',
        md: 'h-9 w-9',
        lg: 'h-10 w-10',
    };

    return (
        <Button
            variant={variant}
            size="icon"
            onClick={onClick}
            aria-label={ariaLabel}
            className={`  
        ${sizeClasses[size]}
        rounded-2xl
        glass-background shadow-md
        hover-button
        transition-all duration-200
        ${className}
      `}
        >
            {icon}
        </Button>
    );
}
