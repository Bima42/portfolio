import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import { Logo, VerticalDivider } from "./atoms";
import { NavigationMenu, LanguageToggle, ThemeToggle, MobileMenu } from "./molecules";
import type { NavigationMenuItem } from "./types";

export interface HeaderProps {
  className?: string;
}

export function Header({
  className = '',
}: HeaderProps) {
  const themeHook = useTheme();
  const languageHook = useLanguage();
  
  const theme = themeHook.theme;

  const defaultNavigation: NavigationMenuItem[] = [
    { label: languageHook.t("navigation.about"), href: "/about" },
    { label: languageHook.t("navigation.projects"), href: "/projects" },
    { label: languageHook.t("navigation.contact"), href: "/contact" }
  ];

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
          boxShadow: theme === "dark" 
            ? `0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`
            : `0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)`
        }}
      >
        <div className="flex items-center justify-between">
          {/* Left: Logo */}
          <Logo src={"logo-no-bg.svg"} alt={"logo"}/>

          {/* Center: Desktop Navigation */}
          <NavigationMenu 
            items={defaultNavigation}
            className="flex-1 justify-center"
          />

          {/* Right: Controls */}
          <div className="flex items-center space-x-3">
            {/* Desktop Controls */}
            <div className="hidden md:flex items-center space-x-3">
              <LanguageToggle />
              
              <VerticalDivider />
              
              <ThemeToggle />
            </div>

            <MobileMenu navigationItems={defaultNavigation} />
          </div>
        </div>
      </div>
    </header>
  );
}