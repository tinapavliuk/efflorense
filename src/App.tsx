import { Footer } from '@widgets/Footer'
import MenuFab from '@widgets/MenuFab/MenuFab'
import { Outlet, useLocation } from 'react-router-dom'
import { ScrollToTop } from '@shared/ui/ScrollToTop'

export default function App() {
  const location = useLocation()

  return (
    <div style={{ minHeight: '100dvh', display: 'grid', gridTemplateRows: '1fr auto' }}>
      <ScrollToTop />
      <main key={location.pathname}>
        <Outlet />
      </main>
      <MenuFab />
      <Footer />
    </div>
  )
}
