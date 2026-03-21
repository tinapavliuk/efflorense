import { useEffect, useState } from 'react'
import { useAuth } from '../auth/useAuth'

const API = 'http://localhost:3000'

export type CartItem = {
  id?: number
  flowerId?: number
  name: string
  image?: string
  price: number
  quantity: number
  kind: 'flower' | 'packaging'
  userId: number
}

function getToken() {
  try {
    return localStorage.getItem('token')
  } catch {
    return null
  }
}

export function useCart() {
  const { user } = useAuth()
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      setCart([])
      setLoading(false)
      return
    }

    ;(async () => {
      setLoading(true)
      setError(null)
      const token = getToken()
      if (!token) {
        setCart([])
        setLoading(false)
        setError('Not authenticated')
        return
      }

      try {
        const res = await fetch(`${API}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) {
          if (res.status === 401) {
            setCart([])
            setError('Unauthorized')
            return
          }
          setError('Failed to load cart')
          return
        }

        const data = await res.json()
        setCart(data)
      } catch {
        setError('Failed to load cart')
      } finally {
        setLoading(false)
      }
    })()
  }, [user])

  async function addToCart(item: Omit<CartItem, 'id' | 'userId'>) {
    if (!user) return
    const token = getToken()
    if (!token) return

    const existing = cart.find(
      c => c.kind === 'flower' && c.flowerId === item.flowerId && c.userId === user.id
    )

    if (existing && existing.id) {
      const newQty = existing.quantity + item.quantity

      const res = await fetch(`${API}/cart/${existing.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQty }),
      })

      if (!res.ok) return

      const updated = await res.json()
      setCart(prev => prev.map(c => (c.id === existing.id ? updated : c)))
      return
    }

    const res = await fetch(`${API}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...item }),
    })

    if (!res.ok) return

    const created = await res.json()
    setCart(prev => [...prev, created])
  }

  async function updateQuantity(id: number, quantity: number) {
    if (quantity <= 0) {
      await removeFromCart(id)
      return
    }

    const token = getToken()
    if (!token) return

    const res = await fetch(`${API}/cart/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity }),
    })

    if (!res.ok) return

    const updated = await res.json()
    setCart(prev => prev.map(c => (c.id === id ? updated : c)))
  }

  async function removeFromCart(id: number) {
    const token = getToken()
    if (!token) return

    await fetch(`${API}/cart/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setCart(prev => prev.filter(c => c.id !== id))
  }

  async function upsertPackaging(name: string, price: number, image?: string) {
    if (!user) return
    const token = getToken()
    if (!token) return

    const existing = cart.find(c => c.kind === 'packaging' && c.userId === user.id)

    if (existing?.id) {
      const res = await fetch(`${API}/cart/${existing.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, price, image }),
      })

      if (!res.ok) return

      const updated = await res.json()
      setCart(prev => prev.map(c => (c.id === existing.id ? updated : c)))
      return
    }

    const res = await fetch(`${API}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        price,
        image,
        quantity: 1,
        kind: 'packaging',
      }),
    })

    if (!res.ok) return

    const created = await res.json()
    setCart(prev => [...prev, created])
  }

  async function placeOrder() {
    if (!user) return
  
    const flowers = cart.filter(c => c.kind === 'flower')
    const packaging = cart.find(c => c.kind === 'packaging')
  
    if (flowers.length === 0 || !packaging) return
  
    const token = getToken()
    if (!token) return
  
    const res = await fetch(`${API}/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  
    if (!res.ok) return
  
    setCart([])
  }
  

  return {
    cart,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    upsertPackaging,
    placeOrder,
  }
}
