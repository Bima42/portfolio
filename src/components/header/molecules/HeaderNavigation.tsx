import { AnimatePresence, motion } from 'framer-motion';
import { DesktopNavigation } from './desktop/DesktopNavigation.tsx';
import type { NavigationMenuItem } from '../types';

interface HeaderNavigationProps {
    items: NavigationMenuItem[];
    animationComplete: boolean;
}

export function HeaderNavigation({
    items,
    animationComplete,
}: HeaderNavigationProps) {
    return (
        <AnimatePresence>
            {animationComplete && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex-1 justify-center"
                >
                    <DesktopNavigation
                        items={items}
                        className="flex-1 justify-center"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
