import { useRef, useMemo, useCallback } from 'react';
import { useScroll, useTransform, MotionValue } from 'framer-motion';

interface UseHorizontalScrollOptions {
    totalCards: number;
    cardWidth: number;
    gap: number;
}

interface UseHorizontalScrollReturn {
    currentIndex: MotionValue<number>;
    scrollProgress: MotionValue<number>;
    containerRef: React.RefObject<HTMLDivElement | null>;
    translateX: MotionValue<number>;
}

export function useHorizontalScroll(
    options: UseHorizontalScrollOptions
): UseHorizontalScrollReturn {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const { centerOffset } = useMemo(() => {
        const totalWidth =
            (options.totalCards - 1) * (options.cardWidth + options.gap);
        const centerOffset = totalWidth / 2;

        const segment = 1 / (options.totalCards - 1);
        const indexThresholds = Array.from(
            { length: options.totalCards },
            (_, i) => {
                const baseThreshold = i * segment;
                return Math.max(0, baseThreshold - segment * 0.3);
            }
        );

        return { centerOffset, indexThresholds };
    }, [options.totalCards, options.cardWidth, options.gap]);

    const translateX = useTransform(
        scrollYProgress,
        [0, 1],
        [centerOffset, -centerOffset]
    );

    const currentIndex = useTransform(
        scrollYProgress,
        useCallback(
            (progress: number) => {
                // Éviter les calculs si pas de changement significatif
                const segment = 1 / (options.totalCards - 1);
                const rawIndex = progress / segment;
                return Math.min(
                    Math.max(0, Math.round(rawIndex)),
                    options.totalCards - 1
                );
            },
            [options.totalCards]
        )
    );

    return {
        containerRef,
        translateX,
        currentIndex,
        scrollProgress: scrollYProgress,
    };
}
