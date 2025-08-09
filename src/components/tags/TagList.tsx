import { cn } from '@/lib/utils';
import { Tag } from './Tag';

interface TagListProps {
    tags: string[];
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    wrap?: boolean;
}

export const TagList = ({
    tags,
    className,
    size = 'md',
    wrap = true,
    ...props
}: TagListProps) => {
    return (
        <div
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
};
