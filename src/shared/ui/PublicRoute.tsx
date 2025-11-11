import { Navigate, Outlet } from 'react-router-dom'

type PublicRouteProps = {
  isAllowed: boolean
  redirectTo?: string
}

export function PublicRoute({ isAllowed, redirectTo = '/home-after' }: PublicRouteProps) {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />
  }
  return <Outlet />
}
