import { Navigate } from 'react-router-dom'

type ProtectedRouteProps = {
  isAllowed: boolean
  redirectTo?: string
  children: React.ReactNode
}

export function ProtectedRoute({ isAllowed, redirectTo = '/auth/login', children }: ProtectedRouteProps) {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />
  }
  return children
}
