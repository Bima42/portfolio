import { cn } from '@/lib/utils';
import { getTagById } from './tagData';
import { Logo } from '@/components/header';

interface TagProps {
    id: string;
    size?: 'sm' | 'md' | 'lg';
}

export const Tag = ({ id, size = 'md' }: TagProps) => {
    const tagData = getTagById(id);

    if (!tagData) {
        return null;
    }

    const { label, icon } = tagData;

    const sizeClasses = {
        sm: 'h-6 px-3 text-xs gap-1.5',
        md: 'h-7 px-3 text-xs gap-1.5',
        lg: 'h-8 px-3 text-sm gap-2',
    };

    const iconSizes = {
        sm: 'h-2',
        md: 'h-4',
        lg: 'h-6',
    };

    return (
        <span
            className={cn(
                'glass-background inline-flex items-center font-medium text-foreground',
                'rounded-md transition-all duration-200',
                sizeClasses[size]
            )}
        >
            <Logo src={icon} logoHeight={iconSizes[size]} />
            {label}
        </span>
    );
};
