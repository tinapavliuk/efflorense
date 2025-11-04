import { Footer } from '@widgets/Footer'
import MenuFab from '@widgets/MenuFab/MenuFab'
import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div style={{ minHeight: '100dvh', display: 'grid', gridTemplateRows: '1fr auto' }}>
      <main>
        <Outlet />
      </main>
      <MenuFab />
      <Footer />
    </div>
  )
}
