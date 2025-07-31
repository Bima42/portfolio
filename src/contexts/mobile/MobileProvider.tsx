import { type ReactNode, useEffect, useState } from 'react';
import { MobileContext } from '@/contexts/mobile/MobileContext.tsx';
import { constants } from '@/constants.ts';

export function MobileProvider({ children }: { children: ReactNode }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () =>
            setIsMobile(window.innerWidth < constants.MOBILE_BREAKPOINT);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <MobileContext.Provider value={isMobile}>
            {children}
        </MobileContext.Provider>
    );
}
