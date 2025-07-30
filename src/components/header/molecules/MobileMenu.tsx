import { Menu, X } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { IconButton, VerticalDivider } from '../atoms';
import { LanguageToggle, ThemeToggle } from '../molecules';
import type { NavigationMenuItem } from '../types';
import { useState, useEffect } from 'react';
import { NavigationLink } from '@/components/header/atoms/NavigationLink';
import { useLanguage } from '@/hooks/useLanguage.ts';

interface MobileMenuProps {
    navigationItems: NavigationMenuItem[];
}

export function MobileMenu({ navigationItems }: MobileMenuProps) {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(false);
    }, []);

    const handleToggle = () => setIsOpen(!isOpen);
    const handleClose = () => setIsOpen(false);

    return (
        <div className="md:hidden z-200">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <IconButton
                        icon={<Menu className="h-5 w-5" />}
                        onClick={handleToggle}
                        ariaLabel="Open navigation menu"
                        variant="ghost"
                        className="
              hover:bg-white/10 dark:hover:bg-white/5
              active:bg-white/20 dark:active:bg-white/10
              transition-colors duration-200
            "
                    />
                </SheetTrigger>

                <SheetContent
                    side="right"
                    className="
            w-[min(85vw,320px)]
            bg-background/98 dark:bg-background/95
            backdrop-blur-xl
            border-l border-foreground/10 dark:border-foreground/20
            rounded-l-3xl
            shadow-xl dark:shadow-2xl
            p-0 z-200
          "
                >
                    <div className="flex flex-col h-full">
                        {/* Header */}
                        <SheetHeader
                            className="
              flex flex-row items-center justify-between
              p-6 pb-4
              border-b border-foreground/10 dark:border-foreground/20
            "
                        >
                            <SheetTitle className="text-lg font-semibold text-foreground">
                                {t('header.navigation')}
                            </SheetTitle>
                            <IconButton
                                icon={<X className="h-5 w-5" />}
                                onClick={handleClose}
                                ariaLabel="Close navigation menu"
                                variant="ghost"
                                size="sm"
                                className="
                  hover:bg-white/10 dark:hover:bg-white/5
                  active:bg-white/20 dark:active:bg-white/10
                  transition-colors duration-200
                "
                            />
                        </SheetHeader>

                        {/* Navigation Links */}
                        <nav
                            className="
                  flex flex-col
                flex-1
                px-4 py-6
                space-y-2
                overflow-y-auto
              "
                            role="navigation"
                            aria-label="Mobile navigation"
                        >
                            {navigationItems.map(item => (
                                <NavigationLink
                                    key={item.id}
                                    item={item}
                                    onClick={handleClose}
                                    isMobile={true}
                                />
                            ))}
                        </nav>

                        {/* Bottom Controls */}
                        <div
                            className="
              border-t border-foreground/10 dark:border-foreground/20
              bg-foreground/5 dark:bg-foreground/10
              p-6
              backdrop-blur-sm
            "
                        >
                            <div className="flex items-center justify-center space-x-6">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium text-foreground/70 dark:text-foreground/60">
                                        {t('header.theme')}
                                    </span>
                                    <ThemeToggle />
                                </div>

                                <VerticalDivider
                                    height="h-6"
                                    className="bg-foreground/20 dark:bg-foreground/30"
                                />

                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium text-foreground/70 dark:text-foreground/60">
                                        {t('header.language')}
                                    </span>
                                    <LanguageToggle />
                                </div>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
