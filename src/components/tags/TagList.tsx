import { cn } from '@/lib/utils';
import { Tag } from './Tag';

interface TagListProps {
    tags: string[];
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export const TagList = ({
    tags,
    className,
    size = 'md',
    ...props
}: TagListProps) => {
    return (
        <div className={cn('flex-wrap flex gap-2', className)} {...props}>
            {tags.map(tagId => (
                <Tag key={tagId} id={tagId} size={size} />
            ))}
        </div>
    );
};
