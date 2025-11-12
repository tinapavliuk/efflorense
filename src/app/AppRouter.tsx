import { RouterProvider } from 'react-router-dom'
import { useAuth } from '../shared/auth/useAuth'
import { createAppRouter } from './router'

export function AppRouter() {
  const { isAuth } = useAuth()
  const router = createAppRouter(isAuth)

  return <RouterProvider router={router} />
}
