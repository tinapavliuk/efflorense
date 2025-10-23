import { Link } from 'react-router-dom'

export function DevNav() {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 8,
        left: 8,
        zIndex: 9999,
        background: '#0000000d',
        padding: 8,
        borderRadius: 8,
      }}
    >
      <Link to="/">Home</Link> · <Link to="/home-after">Home After</Link> ·{' '}
      <Link to="/auth">Auth</Link> · <Link to="/catalog">Catalog</Link> ·{' '}
      <Link to="/mood">Mood</Link> · <Link to="/garden">Garden</Link> · <Link to="/cart">Cart</Link>
    </nav>
  )
}
