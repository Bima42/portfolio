import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { type Language, useLanguage } from '@/hooks/useLanguage';
import { Logo, VerticalDivider } from './atoms';
import { NavigationMenu, LanguageToggle, ThemeToggle, MobileMenu } from './molecules';
import type { HeaderContainerProps, NavigationMenuItem } from './types';

export function Header({
  className = '',
  onLanguageChange,
  onThemeToggle,
  currentTheme,
  currentLanguage,
  navigationItems
}: HeaderContainerProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const themeHook = useTheme();
  const languageHook = useLanguage();
  
  const theme = currentTheme || themeHook.theme;
  const language = currentLanguage || languageHook.currentLanguage;

  // Dynamic navigation items based on language
  const defaultNavigation: NavigationMenuItem[] = [
    { label: languageHook.t('navigation.about'), href: '/about' },
    { label: languageHook.t('navigation.projects'), href: '/projects' },
    { label: languageHook.t('navigation.contact'), href: '/contact' }
  ];

  const finalNavigationItems = navigationItems || defaultNavigation;
  
  const handleThemeToggle = () => {
    if (onThemeToggle) {
      onThemeToggle();
    } else {
      themeHook.toggleTheme();
    }
  };
  
  const handleLanguageChange = (newLanguage: Language) => {
    if (onLanguageChange) {
      onLanguageChange(newLanguage);
    } else {
      languageHook.changeLanguage(newLanguage);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`
        fixed top-4 left-1/2 -translate-x-1/2
        z-50
        w-[calc(100%-2rem)] max-w-4xl
        ${className}
      `}
    >
      <div 
        className="
          px-6 py-3
          rounded-3xl
          backdrop-blur-xl saturate-180
          bg-white/10 dark:bg-white/5
          border border-white/20 dark:border-white/10
          shadow-lg shadow-black/5 dark:shadow-black/20
          transition-all duration-300
          hover:bg-white/15 dark:hover:bg-white/10
        "
        style={{
          boxShadow: theme === 'dark' 
            ? `0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`
            : `0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)`
        }}
      >
        <div className="flex items-center justify-between">
          {/* Left: Logo */}
          <Logo src={"public/logo-no-bg.svg"} alt={"logo"}/>

          {/* Center: Desktop Navigation */}
          <NavigationMenu 
            items={finalNavigationItems}
            className="flex-1 justify-center"
          />

          {/* Right: Controls */}
          <div className="flex items-center space-x-3">
            {/* Desktop Controls */}
            <div className="hidden md:flex items-center space-x-3">
              <LanguageToggle
                currentLanguage={language}
                onLanguageChange={handleLanguageChange}
              />
              
              <VerticalDivider />
              
              <ThemeToggle
                currentTheme={theme}
                onToggle={handleThemeToggle}
              />
            </div>

            {/* Mobile Menu */}
            <MobileMenu
              isOpen={mobileMenuOpen}
              onToggle={toggleMobileMenu}
              navigationItems={finalNavigationItems}
              onLanguageChange={handleLanguageChange}
              onThemeToggle={handleThemeToggle}
              currentTheme={theme}
              currentLanguage={language}
            />
          </div>
        </div>
      </div>
    </header>
  );
}