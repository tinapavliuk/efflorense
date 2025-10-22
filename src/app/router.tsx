import AuthPage from '@pages/auth'
import CartPage from '@pages/cart'
import CatalogPage from '@pages/catalog'
import GardenPage from '@pages/garden'
import HomePage from '@pages/home'
import MoodPage from '@pages/mood'
import { createBrowserRouter } from 'react-router-dom'

import App from '../App'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'catalog', element: <CatalogPage /> },
      { path: 'mood', element: <MoodPage /> },
      { path: 'garden', element: <GardenPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'auth', element: <AuthPage /> },
    ],
  },
])
