import { createRootRoute, Outlet } from '@tanstack/react-router';

import { ThemeProvider } from '@/contexts/theme/ThemeProvider.tsx';

function RootContent() {
    return (
        <ThemeProvider>
            <Outlet />
        </ThemeProvider>
    );
}

export const Route = createRootRoute({
    component: () => <RootContent />,
});
