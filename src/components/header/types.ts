import type { Language } from '@/hooks/useLanguage.ts';

export interface NavigationMenuItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface LogoProps {
  src?: string;
  alt?: string;
  text?: string;
  className?: string;
  href?: string;
}

export interface VerticalDividerProps {
  className?: string;
  height?: string;
}

export interface NavigationMenuProps {
  items: NavigationMenuItem[];
  className?: string;
}

export interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  ariaLabel: string;
  variant?: 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface LanguageToggleProps {
  currentLanguage: string;
  onLanguageChange: (lang: Language) => void;
  className?: string;
}

export interface ThemeToggleProps {
  currentTheme: 'light' | 'dark';
  onToggle: () => void;
  className?: string;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  navigationItems: NavigationMenuItem[];
  onLanguageChange: (lang: Language) => void;
  onThemeToggle: () => void;
  currentTheme: 'light' | 'dark';
  currentLanguage: string;
}

export interface HeaderContainerProps {
  className?: string;
  logo?: LogoProps;
  onLanguageChange?: (lang: string) => void;
  onThemeToggle?: () => void;
  currentTheme?: 'light' | 'dark';
  currentLanguage?: string;
  navigationItems?: NavigationMenuItem[];
}