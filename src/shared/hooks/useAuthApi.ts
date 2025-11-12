const API_URL = 'http://localhost:3000'

type LoginPayload = {
  email: string
  password: string
}

type RegisterPayload = {
  email: string
  password: string
  name?: string
}

export function useAuthApi() {
  async function login(data: LoginPayload) {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      throw new Error('Wrong email or password')
    }
    return res.json()
  }

  async function register(data: RegisterPayload) {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      throw new Error('Can not register')
    }

    return res.json()
  }

  return { login, register }
}
