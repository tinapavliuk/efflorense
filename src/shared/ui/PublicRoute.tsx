import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

type Props = {
  children?: React.ReactNode
}

export function PublicRoute({ children }: Props) {
  const { isAuth, loading } = useAuth()

  if (loading) {
    return null
  }

  if (isAuth) {
    return <Navigate to="/home-after" replace />
  }

  return children ?? <Outlet />
}
