import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import type { TimelineItemProps } from '../types.ts';
import { TimelineDot } from '@/components/about/atoms/TimelineDot.tsx';
import { ConnectorLine } from '@/components/about/atoms/ConnectorLine.tsx';
import { TimelineCard } from '@/components/about/molecules/TimelineCard.tsx';
import { useIsMobile } from '@/hooks/useIsMobile.tsx';

export function TimelineItem({ item, isLeft }: TimelineItemProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start 1.2', 'end 0.3'],
    });

    const keyframes = [0, 0.5, 1];

    const cardX = useTransform(
        scrollYProgress,
        keyframes,
        isMobile
            ? [0, 5, 15] // Mobile: from right to center, stay at center
            : [0, isLeft ? -50 : 50, isLeft ? -80 : 80] // Desktop: from center to left/right
    );

    const cardOpacity = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        [0, 1, 1, 0]
    );
    const dotScale = useTransform(scrollYProgress, keyframes, [0.8, 1.2, 1]);

    const lineWidth = useTransform(
        scrollYProgress,
        keyframes,
        isMobile ? [0, 30, 40] : [0, 50, 80]
    );

    const getTypeStyles = (type: string) => {
        switch (type) {
            case 'experience':
                return 'border-l-4 border-l-primary bg-primary/5';
            case 'education':
            case 'project':
                return 'border-l-4 border-l-primary bg-primary/10';
            default:
                return 'border-l-4 border-l-foreground/50 bg-foreground/5';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'experience':
                return '💼';
            case 'education':
                return '🎓';
            case 'project':
                return '🚀';
            case 'travel':
                return '✈️';
            default:
                return '📍';
        }
    };

    return (
        <div ref={ref} className="relative h-[50vh] flex items-center">
            <TimelineDot dotScale={dotScale} />

            <ConnectorLine
                lineWidth={lineWidth}
                cardOpacity={cardOpacity}
                isMobile={isMobile}
                isLeft={isLeft}
            />

            <TimelineCard
                item={item}
                isLeft={isLeft}
                cardX={cardX}
                cardOpacity={cardOpacity}
                getTypeStyles={getTypeStyles}
                getTypeIcon={getTypeIcon}
            />
        </div>
    );
}
