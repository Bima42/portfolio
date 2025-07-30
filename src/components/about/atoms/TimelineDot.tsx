import { motion, type MotionValue } from 'framer-motion';

interface TimelineDotProps {
    dotScale: MotionValue<number>;
}

export function TimelineDot({ dotScale }: TimelineDotProps) {
    return (
        <motion.div
            className="absolute left-6 top-1/2 -translate-y-1/2 -translate-x-1/2 md:left-1/2 z-20"
            style={{ scale: dotScale }}
        >
            <div className="w-4 h-4 rounded-full bg-primary border-2 border-background shadow-xl flex items-center justify-center" />
        </motion.div>
    );
}
