import { useLanguage } from '@/hooks/useLanguage.ts';
import type { TimelineItem } from '@/components/about/types.ts';

interface CardContentProps {
    item: TimelineItem;
}

export function CardContent({ item }: CardContentProps) {
    const { t } = useLanguage();
    return (
        <>
            {/* Title */}
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
                {t(item.title)}
            </h3>

            {/* Location */}
            {item.location && (
                <p className="text-xs text-foreground/70 mb-4 flex items-center">
                    {t(item.location)}
                </p>
            )}

            {/* Description */}
            <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                {t(item.description, {
                    break: <br />,
                })}
            </p>
        </>
    );
}
