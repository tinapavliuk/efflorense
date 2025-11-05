import { createBrowserRouter, Navigate } from 'react-router-dom'

import App from '../App'
import HomePage from '../pages/home'
import HomeAfterPage from '../pages/home/after'
import CatalogPage from '../pages/catalog'
import MoodPage from '../pages/mood'
import GardenPage from '../pages/garden'
import CartPage from '../pages/cart'
import MenuPage from '../pages/menu'
import LoginPage from '../pages/auth/login'
import RegisterPage from '../pages/auth/register'
import BlankLayout from './BlankLayout'
import NotFoundPage from '../pages/not-found'
import AboutUsPage from '../pages/about'
import { ProtectedRoute } from '../shared/ui/ProtectedRoute'
import { PublicRoute } from '../shared/ui/PublicRoute'

const isAuth = false

export const router = createBrowserRouter([

  {
    element: <BlankLayout />,
    children: [
      {
        element: <PublicRoute isAllowed={!isAuth} />,
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
    element: <App />,
    children: [
      {
        path: 'home-after',
        element: (
          <ProtectedRoute isAllowed={isAuth}>
            <HomeAfterPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'catalog',
        element: (
          <ProtectedRoute isAllowed={isAuth}>
            <CatalogPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'mood',
        element: (
          <ProtectedRoute isAllowed={isAuth}>
            <MoodPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'garden',
        element: (
          <ProtectedRoute isAllowed={isAuth}>
            <GardenPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'cart',
        element: (
          <ProtectedRoute isAllowed={isAuth}>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'menu',
        element: (
          <ProtectedRoute isAllowed={isAuth}>
            <MenuPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'about',
        element: (
          <ProtectedRoute isAllowed={isAuth}>
            <AboutUsPage />
          </ProtectedRoute>
        ),
      },
      
    ],
  },

  {
    path: '*',
    element: <NotFoundPage />,
  },
])
