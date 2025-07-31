import { createRootRoute, Outlet } from '@tanstack/react-router';

import { ThemeProvider } from '@/contexts/theme/ThemeProvider.tsx';
import { MobileProvider } from '@/contexts/mobile/MobileProvider.tsx';

function RootContent() {
    return (
        <ThemeProvider>
            <MobileProvider>
                <Outlet />
            </MobileProvider>
        </ThemeProvider>
    );
}

export const Route = createRootRoute({
    component: () => <RootContent />,
});
