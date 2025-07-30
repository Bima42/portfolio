import { Logo } from '@/components/header';
import type { TimelineItem } from '@/components/about/types.ts';

interface CardHeaderProps {
    item: TimelineItem;
    getTypeIcon: (type: string) => string;
}

export function CardHeader({ item, getTypeIcon }: CardHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-4">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-primary bg-primary/10 rounded-full">
                {item.date}
            </span>
            {item.icon ? (
                <Logo src={item.icon} alt={'card-logo'} logoHeight={'h-6'} />
            ) : (
                <span className="text-2xl opacity-60">
                    {getTypeIcon(item.type)}
                </span>
            )}
        </div>
    );
}
