import { Outlet, useLocation } from 'react-router-dom'
import { ScrollToTop } from '@shared/ui/ScrollToTop'

export default function BlankLayout() {
  const location = useLocation()

  return (
    <div style={{ minHeight: '100dvh' }}>
      <ScrollToTop />
      <main key={location.pathname}>
        <Outlet />
      </main>
    </div>
  )
}
