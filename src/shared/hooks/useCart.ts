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
      try {
        const res = await fetch(`${API}/cart?userId=${user.id}`)
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

    const existing = cart.find(
      (c) =>
        c.kind === 'flower' &&
        c.flowerId === item.flowerId &&
        c.userId === user.id,
    )

    if (existing && existing.id) {
      const newQty = existing.quantity + item.quantity

      const res = await fetch(`${API}/cart/${existing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQty }),
      })
      const updated = await res.json()
      setCart((prev) => prev.map((c) => (c.id === existing.id ? updated : c)))
      return
    }

    const res = await fetch(`${API}/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...item, userId: user.id }),
    })
    const created = await res.json()
    setCart((prev) => [...prev, created])
  }

  async function updateQuantity(id: number, quantity: number) {
    if (quantity <= 0) {
      await removeFromCart(id)
      return
    }
    const res = await fetch(`${API}/cart/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity }),
    })
    const updated = await res.json()
    setCart((prev) => prev.map((c) => (c.id === id ? updated : c)))
  }

  async function removeFromCart(id: number) {
    await fetch(`${API}/cart/${id}`, { method: 'DELETE' })
    setCart((prev) => prev.filter((c) => c.id !== id))
  }

  async function upsertPackaging(name: string, price: number, image?: string) {
    if (!user) return

    const existing = cart.find((c) => c.kind === 'packaging' && c.userId === user.id)

    if (existing?.id) {
      const res = await fetch(`${API}/cart/${existing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price, image }),
      })
      const updated = await res.json()
      setCart((prev) => prev.map((c) => (c.id === existing.id ? updated : c)))
      return
    }

    const res = await fetch(`${API}/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        price,
        image,
        quantity: 1,
        kind: 'packaging',
        userId: user.id,
      }),
    })
    const created = await res.json()
    setCart((prev) => [...prev, created])
  }

  return {
    cart,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    upsertPackaging,
  }
}
