import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';
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
    const { isDark } = useTheme();
    const { t } = useLanguage();
    const isMobile = useIsMobile();

    const defaultNavigation: NavigationMenuItem[] = [
        { label: t('navigation.projects'), id: 'projects' },
        { label: t('navigation.contact'), id: 'contact' },
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
                className="px-6 py-3 border border-transparent rounded-4xl"
                animate={{
                    backgroundColor: animationComplete
                        ? isDark
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(255, 255, 255, 0)',
                    borderColor: animationComplete
                        ? isDark
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'rgba(255, 255, 255, 0.2)'
                        : 'rgba(255, 255, 255, 0)',
                    backdropFilter: animationComplete
                        ? 'blur(12px)'
                        : 'blur(0px)',
                    boxShadow: animationComplete
                        ? isDark
                            ? '0 8px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                            : '0 8px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
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
