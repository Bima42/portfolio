import { useLanguage } from '@/hooks/useLanguage';
import { motion } from 'framer-motion';
import { HeaderLogo } from './molecules/HeaderLogo';
import { HeaderControls } from './organisms/HeaderControls.tsx';
import type { NavigationMenuItem } from './types';
import { useIsMobile } from '@/hooks/useIsMobile.tsx';
import { DesktopNavigation } from '@/components/header/molecules';

interface HeaderProps {
    animationComplete: boolean;
    onLogoAnimationComplete: () => void;
}

export function Header({
    animationComplete,
    onLogoAnimationComplete,
}: HeaderProps) {
    const { t } = useLanguage();
    const isMobile = useIsMobile();

    const defaultNavigation: NavigationMenuItem[] = [
        { label: t('navigation.projects'), id: 'projects' },
        { label: t('navigation.contact'), id: 'contact' },
        { label: t('navigation.blog'), id: 'blog' },
    ];

    return (
        <header
            className="
              fixed
              top-4 left-4 right-4 md:left-12 md:right-12
              max-w-full
              z-100
             "
        >
            <motion.div
                className="px-6 py-3 border-transparent rounded-md"
                animate={{
                    backgroundColor: animationComplete
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(255, 255, 255, 0)',
                    borderColor: animationComplete
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'rgba(255, 255, 255, 0)',
                    backdropFilter: animationComplete
                        ? 'blur(12px)'
                        : 'blur(0px)',
                    boxShadow: animationComplete
                        ? '0 8px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                        : '0 0 0 rgba(0, 0, 0, 0)',
                }}
                transition={{
                    duration: 0.8,
                    ease: 'easeOut',
                    delay: 0.2,
                }}
            >
                <div className="flex items-center justify-between">
                    <HeaderLogo
                        animationComplete={animationComplete}
                        onLogoAnimationComplete={onLogoAnimationComplete}
                    />

                    {!isMobile && (
                        <DesktopNavigation
                            items={defaultNavigation}
                            animationComplete={animationComplete}
                        />
                    )}

                    <HeaderControls
                        animationComplete={animationComplete}
                        navigationItems={defaultNavigation}
                    />
                </div>
            </motion.div>
        </header>
    );
}
