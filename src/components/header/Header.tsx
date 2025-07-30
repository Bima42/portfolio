import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import { Logo, VerticalDivider } from './atoms';
import { NavigationMenu, LanguageToggle, ThemeToggle, MobileMenu } from "./molecules";
import type { NavigationMenuItem } from "./types";
import { GithubButton } from '@/components/buttons/GithubButton.tsx';
import { AnimatePresence, motion } from 'framer-motion';
import { AnimatedLogo } from '@/components/header/atoms/AnimatedLogo.tsx';
interface HeaderProps {
  animationComplete: boolean;
  onLogoAnimationComplete: () => void;
}

export function Header({ animationComplete, onLogoAnimationComplete }: HeaderProps) {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const defaultNavigation: NavigationMenuItem[] = [
    { label: t("navigation.projects"), id: "projects" },
    { label: t("navigation.contact"), id: "contact" }
  ];

  return (
    <header className="
      fixed
      top-4 left-4 right-4
      max-w-full
      z-100
     ">
      <motion.div 
        className="px-6 py-3 border border-transparent rounded-4xl"
        animate={{
          backgroundColor: animationComplete 
            ? isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.1)'
            : 'rgba(255, 255, 255, 0)',
          borderColor: animationComplete 
            ? isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)'
            : 'rgba(255, 255, 255, 0)',
          backdropFilter: animationComplete ? 'blur(12px)' : 'blur(0px)',
          boxShadow: animationComplete 
            ? isDark 
              ? '0 8px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              : '0 8px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            : '0 0 0 rgba(0, 0, 0, 0)'
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 0.2
        }}
      >
        <div className="flex items-center justify-between">
          {/* Fallback Logo for initial animation state - allow to take space and avoid weird animation effect */}
          {!animationComplete && <Logo className={'opacity-0'} logoHeight={'h-10'} />}

          {/* Left: Logo */}
          <AnimatePresence>
            <AnimatedLogo
                isAnimating={!animationComplete}
                onAnimationComplete={onLogoAnimationComplete}
            />
          </AnimatePresence>

          {/* Center: Desktop Navigation */}
          <AnimatePresence>
            {animationComplete && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex-1 justify-center"
              >
                <NavigationMenu
                  items={defaultNavigation}
                  className="flex-1 justify-center"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right: Controls */}
          <AnimatePresence>
            {animationComplete && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex items-center space-x-3"
              >
                {/* Desktop Controls */}
                <div className="hidden md:flex items-center space-x-3">
                  <GithubButton />
                  <VerticalDivider />
                  <LanguageToggle />
                  <VerticalDivider />
                  <ThemeToggle />
                </div>

                <MobileMenu navigationItems={defaultNavigation} />
              </motion.div>
            )}
          </AnimatePresence>


        </div>
      </motion.div>
    </header>
  );
}