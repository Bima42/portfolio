import { NavigationLink } from '../../atoms/NavigationLink.tsx';
import { AnimatePresence, motion } from 'framer-motion';
import type { NavigationMenuItem } from '@/components/header';

interface DesktopNavigationProps {
    items: NavigationMenuItem[];
    animationComplete: boolean;
}

export function DesktopNavigation({
    items,
    animationComplete,
}: DesktopNavigationProps) {
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
                    <nav
                        className={
                            'flex items-center space-x-2 flex-1 justify-center'
                        }
                        role="navigation"
                        aria-label="Main navigation"
                    >
                        {items.map((item, index) => (
                            <NavigationLink
                                key={`${item.id}_${index}`}
                                item={item}
                                isMobile={false}
                            />
                        ))}
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
