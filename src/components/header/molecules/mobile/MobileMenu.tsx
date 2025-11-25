import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet.tsx';
import { IconButton } from '../../atoms';
import { MobileMenuHeader } from './MobileMenuHeader.tsx';
import { MobileNavigation } from './MobileNavigation.tsx';
import { MobileToggles } from './MobileToggles.tsx';
import type { NavigationMenuItem } from '../../types.ts';
import { useState } from 'react';
import { MobileSocialButtons } from '@/components/header/molecules/mobile/MobileSocialButtons.tsx';

interface MobileMenuProps {
    navigationItems: NavigationMenuItem[];
}

export function MobileMenu({ navigationItems }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);
    const handleClose = () => setIsOpen(false);

    return (
        <div className="z-200">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <IconButton
                        icon={<Menu className="h-5 w-5" />}
                        onClick={handleToggle}
                        ariaLabel="Open navigation menu"
                        variant="ghost"
                        className="
                            hover:bg-white/10
                            active:bg-white/20
                            transition-colors duration-200
                        "
                    />
                </SheetTrigger>

                <SheetContent
                    side="right"
                    className="
                        w-[min(85vw,320px)]
                        bg-background/98
                        backdrop-blur-xl
                        border-l border-foreground/10
                        rounded-md
                        shadow-xl
                        p-0 z-200
                    "
                >
                    <div className="flex flex-col h-full">
                        <MobileMenuHeader onClose={handleClose} />
                        <MobileNavigation
                            navigationItems={navigationItems}
                            onItemClick={handleClose}
                        />
                        <MobileSocialButtons />
                        <MobileToggles />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
