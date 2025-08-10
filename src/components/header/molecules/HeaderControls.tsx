import { AnimatePresence, motion } from 'framer-motion';
import { MobileMenu } from './mobile/MobileMenu.tsx';
import type { NavigationMenuItem } from '../types';
import { useIsMobile } from '@/hooks/useIsMobile.tsx';
import { DesktopControls } from '@/components/header';

interface HeaderControlsProps {
    animationComplete: boolean;
    navigationItems: NavigationMenuItem[];
}

export function HeaderControls({
    animationComplete,
    navigationItems,
}: HeaderControlsProps) {
    const isMobile = useIsMobile();
    return (
        <AnimatePresence>
            {animationComplete && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex items-center space-x-3"
                >
                    {!isMobile && <DesktopControls />}
                    {isMobile && (
                        <MobileMenu navigationItems={navigationItems} />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
