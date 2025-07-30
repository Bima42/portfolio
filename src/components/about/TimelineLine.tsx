import { motion, useScroll, useTransform } from 'framer-motion';

export function TimelineLine() {
    const { scrollYProgress } = useScroll();

    const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
    const dotScale = useTransform(scrollYProgress, [0, 0.01], [1, 0]);

    return (
        <div className="absolute left-6 md:left-1/2 top-0 h-full w-0 z-0 pointer-events-none">

            {/* Background line */}
            <div className="absolute left-0 top-0 w-0.5 h-full bg-foreground/20 md:left-1/2 md:-translate-x-1/2" />

            {/* Animated progress line */}
            <motion.div
                className="absolute left-0 top-0 w-0.5 bg-gradient-to-b from-primary via-secondary/80 to-primary/60 origin-top md:left-1/2 md:-translate-x-1/2"
                style={{ height: lineHeight }}
            />

            {/* Starting dot  */}
            <motion.div
                className="absolute left-0 top-0 w-4 h-4 rounded-full bg-primary border-2 border-background shadow-lg -translate-x-1/2 z-10 md:left-1/2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
                style={{ scale: dotScale }}
            />
        </div>
    );
}