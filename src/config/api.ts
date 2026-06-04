export const BACKEND_ORIGIN = 'http://localhost:5000'
const DEFAULT_API_BASE_URL = `${BACKEND_ORIGIN}/api/v1`

function isAbsoluteHttpUrl(url: string): boolean {
  return /^https?:\/\//i.test(url.trim())
}

function normalizeApiBaseUrl(url: string): string {
  const trimmed = url.trim().replace(/\/$/, '')
  if (!trimmed) return DEFAULT_API_BASE_URL
  if (trimmed.includes('localhost:5173') || trimmed.includes('127.0.0.1:5173')) {
    return DEFAULT_API_BASE_URL
  }
  return trimmed.endsWith('/api/v1') ? trimmed : `${trimmed}/api/v1`
}

/**
 * API base URL for axios (includes `/api/v1`).
 * Set `VITE_API_URL` to `http://localhost:5000` or `http://localhost:5000/api/v1`.
 * Relative values (e.g. `/api/v1`) are ignored so requests never hit the Vite dev server.
 */
export function getApiBaseUrl(): string {
  const fromEnv = import.meta.env.VITE_API_URL
  if (fromEnv && isAbsoluteHttpUrl(fromEnv)) {
    return normalizeApiBaseUrl(fromEnv)
  }
  return DEFAULT_API_BASE_URL
}

export const API_BASE_URL = getApiBaseUrl()
