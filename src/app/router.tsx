// src/app/router.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom'

import App from '../App' // <-- на рівень вище
import LoginPage from '../pages/auth/login/index'
import RegisterPage from '../pages/auth/register'
import CartPage from '../pages/cart'
import CatalogPage from '../pages/catalog'
import GardenPage from '../pages/garden'
import HomePage from '../pages/home'
import HomeAfterPage from '../pages/home/after'
import MenuPage from '../pages/menu'
import MoodPage from '../pages/mood'
import BlankLayout from './BlankLayout' // <-- у цій же папці app

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'home-after', element: <HomeAfterPage /> },
      { path: 'catalog', element: <CatalogPage /> },
      { path: 'mood', element: <MoodPage /> },
      { path: 'garden', element: <GardenPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'menu', element: <MenuPage /> },
      { path: '*', element: <HomePage /> },
    ],
  },
  {
    element: <BlankLayout />,
    children: [
      { path: 'auth', element: <Navigate to="/auth/login" replace /> },
      { path: 'auth/login', element: <LoginPage /> },
      { path: 'auth/register', element: <RegisterPage /> },
    ],
  },
])
