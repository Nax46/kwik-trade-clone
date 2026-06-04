import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const DEFAULT_API_BASE = 'http://localhost:5000/api/v1'

function resolveDevApiBaseUrl(mode: string): string {
  const env = loadEnv(mode, process.cwd(), '')
  const raw = env.VITE_API_URL?.trim() ?? ''
  if (/^https?:\/\//i.test(raw) && !raw.includes('localhost:5173') && !raw.includes('127.0.0.1:5173')) {
    return raw.replace(/\/$/, '').endsWith('/api/v1') ? raw.replace(/\/$/, '') : `${raw.replace(/\/$/, '')}/api/v1`
  }
  return DEFAULT_API_BASE
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const apiBaseUrl = resolveDevApiBaseUrl(mode)

  return {
    plugins: [react()],
    envPrefix: 'VITE_',
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(apiBaseUrl),
    },
    server: {
      port: 5173,
    },
  }
})
