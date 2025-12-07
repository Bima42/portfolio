import { X } from 'lucide-react';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet.tsx';
import { IconButton } from '../../atoms';
import { useLanguage } from '@/hooks/useLanguage.ts';

interface MobileMenuHeaderProps {
    onClose: () => void;
}

export function MobileMenuHeader({ onClose }: MobileMenuHeaderProps) {
    const { t } = useLanguage();

    return (
        <SheetHeader
            className="
                flex flex-row items-center justify-between
                p-4 border-b border-foreground/10
            "
        >
            <SheetTitle className="text-lg font-semibold text-foreground">
                {t('header.navigation')}
            </SheetTitle>
            <IconButton
                icon={<X className="h-5 w-5" />}
                onClick={onClose}
                ariaLabel="Close navigation menu"
                variant="ghost"
                size="sm"
                className="hover:bg-white/10 active:bg-white/20 transition-colors duration-200"
            />
        </SheetHeader>
    );
}
