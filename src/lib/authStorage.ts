export type StoredUser = {
  fullName: string
  email: string
  phone: string
  password: string
}

export type SessionUser = Omit<StoredUser, 'password'>

const USERS_KEY = 'kwik_users'
const SESSION_KEY = 'kwik_session'

export function getStoredUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? (JSON.parse(raw) as StoredUser[]) : []
  } catch {
    return []
  }
}

export function saveStoredUser(user: StoredUser) {
  const users = getStoredUsers()
  const exists = users.some((u) => u.email.toLowerCase() === user.email.toLowerCase())
  if (exists) {
    throw new Error('An account with this email already exists')
  }
  users.push(user)
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function findUserByCredentials(email: string, password: string): SessionUser | null {
  const user = getStoredUsers().find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
  )
  if (!user) return null
  return { fullName: user.fullName, email: user.email, phone: user.phone }
}

export function getSession(): SessionUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as SessionUser) : null
  } catch {
    return null
  }
}

export function setSession(user: SessionUser) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}
