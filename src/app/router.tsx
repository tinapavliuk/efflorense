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
import ProfilePage from '../pages/profile'
import { ProtectedRoute } from '../shared/ui/ProtectedRoute'
import { PublicRoute } from '../shared/ui/PublicRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PublicRoute>
        <HomePage />
      </PublicRoute>
    ),
  },

  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { index: true, element: <Navigate to="/auth/login" replace /> },
      {
        path: 'login',
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        ),
      },
    ],
  },

  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'home-after',
        element: (
          <ProtectedRoute>
            <HomeAfterPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'catalog',
        element: (
          <ProtectedRoute>
            <CatalogPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'mood',
        element: (
          <ProtectedRoute>
            <MoodPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'garden',
        element: (
          <ProtectedRoute>
            <GardenPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'cart',
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'menu',
        element: (
          <ProtectedRoute>
            <MenuPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'about',
        element: (
          <ProtectedRoute>
            <AboutUsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
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
