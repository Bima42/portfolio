import * as React from 'react';
import { cn } from '@/lib/utils';
import { getTagById } from './tagData';
import { Logo } from '@/components/header';

interface TagProps {
    id: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
    ({ id, className, size = 'md', ...props }, ref) => {
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
                ref={ref}
                className={cn(
                    'py-3 px-3 inline-flex items-center font-medium text-foreground',
                    'rounded-full backdrop-blur-sm border transition-all duration-200',
                    'border-gray-300 dark:border-gray-600',
                    'dark:bg-white/5',
                    sizeClasses[size],
                    className
                )}
                {...props}
            >
                <Logo src={icon} logoHeight={iconSizes[size]} />
                {label}
            </span>
        );
    }
);

Tag.displayName = 'Tag';

export { Tag };
