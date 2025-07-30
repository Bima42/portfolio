import { motion, type MotionValue } from 'framer-motion';

interface ConnectorLineProps {
    lineWidth: MotionValue<number>;
    cardOpacity: MotionValue<number>;
    isMobile: boolean;
    isLeft: boolean;
}

export function ConnectorLine({
    lineWidth,
    cardOpacity,
    isMobile,
    isLeft,
}: ConnectorLineProps) {
    return (
        <motion.div
            className={`absolute top-1/2 -translate-y-1/2 h-0.5 bg-foreground/20 z-10 ${
                isMobile ? 'left-6' : isLeft ? 'right-1/2' : 'left-1/2'
            }`}
            style={{
                width: lineWidth,
                opacity: cardOpacity,
                transformOrigin: isMobile
                    ? 'left center'
                    : isLeft
                      ? 'right center'
                      : 'left center',
            }}
        />
    );
}
