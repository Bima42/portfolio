import { useContext } from 'react';
import { MobileContext } from '@/contexts/mobile/MobileContext.tsx';

export function useIsMobile() {
    const context = useContext(MobileContext);
    if (context === undefined) {
        throw new Error('useIsMobile must be used within a MobileProvider');
    }
    return context;
}
