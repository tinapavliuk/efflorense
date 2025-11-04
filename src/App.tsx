import { DevNav } from '@shared/ui/DevNav'
import { Footer } from '@widgets/Footer'
import MenuFab from '@widgets/MenuFab/MenuFab'
import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div style={{ minHeight: '100dvh', display: 'grid', gridTemplateRows: '1fr auto' }}>
      {import.meta.env.DEV && <DevNav />}
      <main>
        <Outlet />
      </main>
      <MenuFab />
      <Footer />
    </div>
  )
}
