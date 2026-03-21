import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

type Props = {
  children?: React.ReactNode
}

export function ProtectedRoute({ children }: Props) {
  const { isAuth, loading } = useAuth()

  if (loading) {
    return null
  }

  if (!isAuth) {
    return <Navigate to="/auth/login" replace />
  }

  return children ?? <Outlet />
}
