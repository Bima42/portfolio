import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import { Logo, VerticalDivider } from "./atoms";
import { NavigationMenu, LanguageToggle, ThemeToggle, MobileMenu } from "./molecules";
import type { NavigationMenuItem } from "./types";

export function Header() {
  const themeHook = useTheme();
  const languageHook = useLanguage();
  
  const theme = themeHook;

  const defaultNavigation: NavigationMenuItem[] = [
    { label: languageHook.t("navigation.about"), href: "/about" },
    { label: languageHook.t("navigation.projects"), href: "/projects" },
    { label: languageHook.t("navigation.contact"), href: "/contact" }
  ];

  return (
    <header className="
      fixed
      top-4 left-[2rem]
      -translate-x-1/2z-50
      w-[calc(100vw-4rem)]
      z-1000
     ">
      <div 
        className="
          px-6 py-3
          rounded-4xl
          backdrop-blur-xl
          bg-white/10 dark:bg-white/5
          border border-white/20 dark:border-white/10
          shadow-md shadow-black/5 dark:shadow-black/20
          transition-all duration-300
          hover:bg-white/15 dark:hover:bg-white/10
        "
        style={{
          boxShadow: theme.isDark
            ? `0 8px 16x rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`
            : `0 8px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)`
        }}
      >
        <div className="flex items-center justify-between">
          {/* Left: Logo */}
          <Logo logoHeight={"h-10"} />

          {/* Center: Desktop Navigation */}
          <NavigationMenu 
            items={defaultNavigation}
            className="flex-1 justify-center"
          />

          {/* Right: Controls */}
          <div className="flex items-center space-x-3">

            {/* Desktop Controls */}
            {/* md:flex make it appears when desktop */}
            <div className="hidden md:flex items-center space-x-3">
              <a 
                href="https://github.com/Bima42/portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center space-x-2 px-4 py-2
                  rounded-full backdrop-blur-sm dark:border dark:border-white/10
                  transition-all duration-200
                  text-xs font-medium
                  dark:bg-white/5
                  text-foreground hover:text-primary
                  hover:bg-primary/10 dark:hover:bg-primary/20 hover:shadow-sm
                "
              >
                <img
                  src={theme.isDark ? "/github-mark-white.svg" : "/github-mark.svg"}
                  alt="GitHub"
                  className="w-4 h-4"
                />
                <span>GITHUB</span>
              </a>
              <VerticalDivider />
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