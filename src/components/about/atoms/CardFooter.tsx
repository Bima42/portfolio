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
                className="inline-flex items-center justify-center gap-2 px-2 py-2 text-sm link-style hover-button"
            >
                <span>{t('timeline.discover')}</span>
                <ExternalLink className="w-4 h-4" />
            </a>
        </div>
    );
}
