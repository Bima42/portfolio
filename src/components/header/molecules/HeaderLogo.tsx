import { AnimatePresence } from 'framer-motion';
import { Logo } from '../atoms';
import { AnimatedLogo } from '../atoms/AnimatedLogo';

interface HeaderLogoProps {
    animationComplete: boolean;
    onLogoAnimationComplete: () => void;
}

export function HeaderLogo({
    animationComplete,
    onLogoAnimationComplete,
}: HeaderLogoProps) {
    return (
        <>
            {!animationComplete && (
                <Logo className={'opacity-0'} logoHeight={'h-10'} />
            )}

            <AnimatePresence>
                <AnimatedLogo
                    isAnimating={!animationComplete}
                    onAnimationComplete={onLogoAnimationComplete}
                />
            </AnimatePresence>
        </>
    );
}
