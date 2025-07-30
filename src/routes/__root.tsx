import { createRootRoute, Outlet } from '@tanstack/react-router'

function RootContent() {
  return <Outlet />;
}

export const Route = createRootRoute({
  component: () => (
      <RootContent />
  ),
})