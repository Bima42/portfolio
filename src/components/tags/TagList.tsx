import * as React from 'react';
import { cn } from '@/lib/utils';
import { Tag } from './Tag';

interface TagListProps {
    tags: string[];
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    wrap?: boolean;
}

const TagList = React.forwardRef<HTMLDivElement, TagListProps>(
    ({ tags, className, size = 'md', wrap = true, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'flex gap-2',
                    wrap ? 'flex-wrap' : 'flex-nowrap overflow-x-auto',
                    className
                )}
                {...props}
            >
                {tags.map(tagId => (
                    <Tag key={tagId} id={tagId} size={size} />
                ))}
            </div>
        );
    }
);

TagList.displayName = 'TagList';

export { TagList };
