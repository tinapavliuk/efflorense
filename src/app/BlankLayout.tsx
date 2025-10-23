import { Outlet } from 'react-router-dom'

export default function BlankLayout() {
  return (
    <div style={{ minHeight: '100dvh' }}>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
