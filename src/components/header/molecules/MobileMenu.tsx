import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Link } from '@tanstack/react-router';
import { IconButton, VerticalDivider } from '../atoms';
import { LanguageToggle, ThemeToggle } from '../molecules';
import type { MobileMenuProps } from '../types';

export function MobileMenu({
  isOpen,
  onToggle,
  navigationItems,
  onLanguageChange,
  onThemeToggle,
  currentTheme,
  currentLanguage
}: MobileMenuProps) {
  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={onToggle}>
        <SheetTrigger asChild>
          <IconButton
            icon={<Menu className="h-5 w-5" />}
            onClick={onToggle}
            ariaLabel="Open navigation menu"
            variant="ghost"
          />
        </SheetTrigger>
        
        <SheetContent 
          side="right" 
          className="
            w-80
            bg-background/95
            backdrop-blur-xl
            border-l border-white/20 dark:border-white/10
            rounded-l-3xl
          "
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-semibold">Menu</h2>
              <IconButton
                icon={<X className="h-5 w-5" />}
                onClick={onToggle}
                ariaLabel="Close navigation menu"
                variant="ghost"
                size="sm"
              />
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={onToggle}
                  className="
                    block
                    px-4 py-3
                    text-base font-medium
                    rounded-2xl
                    transition-all duration-200
                    hover:bg-primary/10
                    border border-transparent
                    hover:border-primary/20
                  "
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Bottom Controls */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex items-center justify-center space-x-4">
                <LanguageToggle
                  currentLanguage={currentLanguage}
                  onLanguageChange={onLanguageChange}
                />
                
                <VerticalDivider height="h-8" />
                
                <ThemeToggle
                  currentTheme={currentTheme}
                  onToggle={onThemeToggle}
                />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}