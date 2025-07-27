import { HeroSection} from '@/components/home';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedLogo } from '@/components/header/atoms/AnimatedLogo';

export default function Home() {
    const [animationComplete, setAnimationComplete] = useState(false);
    const [contentVisible, setContentVisible] = useState(false);

    const handleLogoAnimationComplete = () => {
        if (!animationComplete) {
            setAnimationComplete(true);
            setTimeout(() => {
                setContentVisible(true);
            }, 1000);
        }
    };

    return (
        <div className="relative overflow-hidden">
            <AnimatePresence>
                <AnimatedLogo
                    showInitialAnimation={true}
                    isAnimating={animationComplete}
                    onAnimationComplete={handleLogoAnimationComplete}
                />
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: contentVisible ? 1 : 0 }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                <HeroSection />
            </motion.div>
        </div>
    );
}