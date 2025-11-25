import { useLanguage } from '@/hooks/useLanguage.ts';
import { ExternalLink } from 'lucide-react';
import type { TimelineItem } from '@/components/about/types.ts';

interface CardFooterProps {
    item: TimelineItem;
}

export function CardFooter({ item }: CardFooterProps) {
    const { t } = useLanguage();
    if (!item.link) return null;

    return (
        <div className="mt-6 pt-4 border-t border-foreground/10">
            <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
                <span>{t('timeline.discover')}</span>
                <ExternalLink className="w-4 h-4" />
            </a>
        </div>
    );
}
