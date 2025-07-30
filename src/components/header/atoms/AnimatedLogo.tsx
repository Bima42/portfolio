import { motion } from 'framer-motion';
import { constants } from '@/constants.ts';
import { Logo } from '@/components/header';

interface AnimatedLogoProps {
    isAnimating?: boolean;
    onAnimationComplete?: () => void;
    showInitialAnimation?: boolean;
}

export function AnimatedLogo({
    isAnimating = false,
    onAnimationComplete,
}: AnimatedLogoProps) {
    return (
        <motion.div
            key="animated-logo"
            initial={{
                scale: 0,
                x: '45vw',
                y: '45vh',
                translateX: '-50%',
                translateY: '-50%',
            }}
            animate={
                isAnimating
                    ? {
                          scale: 3,
                          x: '45vw',
                          y: '45vh',
                          translateX: '-50%',
                          translateY: '-50%',
                      }
                    : {
                          scale: 1,
                          x: 0,
                          y: 0,
                          translateX: '0%',
                          translateY: '0%',
                      }
            }
            transition={{
                duration: constants.DURATION_SECONDS_LOGO_ANIMATION,
                delay: 0.5,
                ease: 'easeInOut',
            }}
            onAnimationComplete={onAnimationComplete}
            className={isAnimating ? 'fixed z-50' : 'relative'}
            style={
                isAnimating
                    ? {
                          position: 'fixed',
                          zIndex: 50,
                      }
                    : {}
            }
        >
            <Logo logoHeight={'h-10'} />
        </motion.div>
    );
}
