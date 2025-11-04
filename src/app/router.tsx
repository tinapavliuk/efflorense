import { createBrowserRouter, Navigate } from 'react-router-dom'

import App from '../App'
import LoginPage from '../pages/auth/login'
import RegisterPage from '../pages/auth/register'
import CartPage from '../pages/cart'
import CatalogPage from '../pages/catalog'
import GardenPage from '../pages/garden'
import HomePage from '../pages/home'
import HomeAfterPage from '../pages/home/after'
import MenuPage from '../pages/menu'
import MoodPage from '../pages/mood'
import BlankLayout from './BlankLayout'
import { ProtectedRoute } from '../shared/ui/ProtectedRoute'
import { PublicRoute } from '../shared/ui/PublicRoute'

const isAuth = true

export const router = createBrowserRouter([
  {
    element: <PublicRoute isAllowed={!isAuth} />,
    children: [
      {
        element: <BlankLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'auth', element: <Navigate to="/auth/login" replace /> },
          { path: 'auth/login', element: <LoginPage /> },
          { path: 'auth/register', element: <RegisterPage /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute isAllowed={isAuth} />,
    children: [
      {
        element: <App />,
        children: [
          { path: 'home-after', element: <HomeAfterPage /> },
          { path: 'catalog', element: <CatalogPage /> },
          { path: 'mood', element: <MoodPage /> },
          { path: 'garden', element: <GardenPage /> },
          { path: 'cart', element: <CartPage /> },
          { path: 'menu', element: <MenuPage /> },
          { path: '*', element: <Navigate to="/home-after" replace /> },
        ],
      },
    ],
  },
])
