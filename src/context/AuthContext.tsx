import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { RegisterFormValues } from '../lib/validations/auth'
import {
  clearSession,
  findUserByCredentials,
  getSession,
  saveStoredUser,
  setSession,
  type SessionUser,
} from '../lib/authStorage'
import { registerUserEmail } from '../services/register.service'

type AuthContextValue = {
  user: SessionUser | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterFormValues) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(() => getSession())

  const login = useCallback(async (email: string, password: string) => {
    const match = findUserByCredentials(email, password)
    if (!match) {
      throw new Error('Invalid email or password')
    }
    setSession(match)
    setUser(match)
  }, [])

  const register = useCallback(async (data: RegisterFormValues) => {
    const result = await registerUserEmail({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
    })
    if (!result.success) {
      throw new Error(result.message)
    }

    saveStoredUser({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      password: data.password,
    })
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [user, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
