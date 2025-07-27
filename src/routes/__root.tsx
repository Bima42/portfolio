import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router'
import { Header, SimpleHeader } from '@/components/header'

function RootContent() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <>
      {isHomePage ? <SimpleHeader /> : <Header />}
      <Outlet />
    </>
  )
}

export const Route = createRootRoute({
  component: () => (
      <RootContent />
  ),
})