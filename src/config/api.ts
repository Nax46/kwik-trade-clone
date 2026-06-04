// src/config/api.ts

/**
 * Production:
 * VITE_API_URL=https://kwik-trade-clone-production.up.railway.app/api/v1
 *
 * Development:
 * VITE_API_URL=http://localhost:5000/api/v1
 */

const FALLBACK_API_URL = 'http://localhost:5000/api/v1'

function isAbsoluteHttpUrl(url: string): boolean {
  return /^https?:\/\//i.test(url.trim())
}

function normalizeApiBaseUrl(url: string): string {
  const trimmed = url.trim().replace(/\/$/, '')

  if (!trimmed) {
    return FALLBACK_API_URL
  }

  return trimmed.endsWith('/api/v1')
    ? trimmed
    : `${trimmed}/api/v1`
}

export function getApiBaseUrl(): string {
  const envUrl = import.meta.env.VITE_API_URL

  console.log('🔥 VITE_API_URL =', envUrl)

  if (envUrl && isAbsoluteHttpUrl(envUrl)) {
    return normalizeApiBaseUrl(envUrl)
  }

  console.warn('⚠️ Using fallback API URL:', FALLBACK_API_URL)

  return FALLBACK_API_URL
}

export const API_BASE_URL = getApiBaseUrl()

console.log('🚀 API_BASE_URL =', API_BASE_URL)