import React, { createContext, useCallback, useEffect, useState } from 'react'

type User = {
  id: number
  email: string
  name?: string
  phone?: string
}

type AuthContextValue = {
  user: User | null
  isAuth: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name?: string, phone?: string) => Promise<void>
  logout: () => void
  loading: boolean
  error: string | null
}

export const AuthContext = createContext<AuthContextValue | null>(null)

const API_URL = 'http://localhost:3000'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const name = localStorage.getItem('name')
    const phone = localStorage.getItem('phone')
    const idStr = localStorage.getItem('userId')

    if (token && email && idStr) {
      const id = Number(idStr)
      setUser({
        id,
        email,
        name: name ?? undefined,
        phone: phone ?? undefined,
      })
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        throw new Error('Login failed')
      }

      const data = await res.json()

      localStorage.setItem('token', data.accessToken)
      localStorage.setItem('email', data.user.email)
      localStorage.setItem('userId', String(data.user.id))
      if (data.user.name) {
        localStorage.setItem('name', data.user.name)
      }
      if (data.user.phone) {
        localStorage.setItem('phone', data.user.phone)
      }

      setUser({
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        phone: data.user.phone,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(
    async (email: string, password: string, name?: string, phone?: string) => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${API_URL}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name, phone }),
        })

        if (!res.ok) {
          throw new Error('Register failed')
        }

        const data = await res.json()

        localStorage.setItem('token', data.accessToken)
        localStorage.setItem('email', data.user.email)
        localStorage.setItem('userId', String(data.user.id))
        if (data.user.name) {
          localStorage.setItem('name', data.user.name)
        }
        if (data.user.phone) {
          localStorage.setItem('phone', data.user.phone)
        }

        setUser({
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          phone: data.user.phone,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        throw err
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('name')
    localStorage.removeItem('phone')
    localStorage.removeItem('userId')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, isAuth: Boolean(user), login, register, logout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  )
}
