import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router'
import { Header, SimpleHeader } from '@/components/header'

export const Route = createRootRoute({
  component: () => {
    const location = useLocation()
    const isHomePage = location.pathname === '/'
    
    return (
      <>
        {isHomePage ? <SimpleHeader /> : <Header />}
        <Outlet />
      </>
    )
  },
})