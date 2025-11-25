import { motion, type MotionValue } from 'framer-motion';
import { CardHeader } from '@/components/about/atoms/CardHeader.tsx';
import { CardContent } from '@/components/about/atoms/CardContent.tsx';
import { CardFooter } from '@/components/about/atoms/CardFooter.tsx';
import type { TimelineItem } from '@/components/about/types.ts';

interface TimelineCardProps {
    item: TimelineItem;
    isLeft: boolean;
    cardX: MotionValue<number>;
    cardOpacity: MotionValue<number>;
    getTypeStyles: (type: string) => string;
    getTypeIcon: (type: string) => string;
}

export function TimelineCard({
    item,
    isLeft,
    cardX,
    cardOpacity,
    getTypeStyles,
    getTypeIcon,
}: TimelineCardProps) {
    return (
        <motion.div
            className={`absolute ${
                // Mobile positioning: proper spacing from timeline
                'left-12 right-4 ' +
                // Desktop positioning: alternating sides
                (isLeft
                    ? 'md:left-16 lg:left-20 md:right-1/2  lg:ml-20'
                    : 'md:right-16 lg:right-20 md:left-1/2  lg:mr-20')
            }`}
            style={{
                x: cardX,
                opacity: cardOpacity,
            }}
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div
                className={`p-6 md:p-8 rounded-md backdrop-blur-md bg-background/90 border border-foreground/10 shadow-xl ${getTypeStyles(item.type)}`}
            >
                <CardHeader item={item} getTypeIcon={getTypeIcon} />
                <CardContent item={item} />
                <CardFooter item={item} />
            </div>
        </motion.div>
    );
}
