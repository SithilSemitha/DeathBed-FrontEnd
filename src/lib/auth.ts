export type StoredUser = {
  id?: string
  email?: string
  [key: string]: unknown
}

const ACCESS_TOKEN_KEY = 'deathbed.accessToken'
const USER_KEY = 'deathbed.user'

export function getStoredAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getStoredUser(): StoredUser | null {
  const rawUser = localStorage.getItem(USER_KEY)

  if (!rawUser) {
    return null
  }

  try {
    return JSON.parse(rawUser) as StoredUser
  } catch {
    localStorage.removeItem(USER_KEY)
    return null
  }
}

export function hasStoredSession(): boolean {
  return Boolean(getStoredAccessToken())
}

export function clearStoredSession(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}