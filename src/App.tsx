import { Footer } from '@widgets/Footer'
import { Header } from '@widgets/Header'
import { Link, Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <nav className="p-4 flex gap-3">
        <Link to="/">Home</Link>
        <Link to="/catalog">Catalog</Link>
        <Link to="/mood">Mood</Link>
        <Link to="/garden">Garden</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/auth">Auth</Link>
      </nav>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
