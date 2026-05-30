import { api } from './api'

export type LoginCredentials = {
  email: string
  password: string
}

export type RegisterPayload = LoginCredentials & {
  name: string
}

export const authService = {
  async login(credentials: LoginCredentials) {
    const { data } = await api.post('/auth/login', credentials)
    return data
  },

  async register(payload: RegisterPayload) {
    const { data } = await api.post('/auth/register', payload)
    return data
  },

  logout() {
    localStorage.removeItem('auth_token')
  },
}
