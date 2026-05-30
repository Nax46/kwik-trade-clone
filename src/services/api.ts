import axios from 'axios'

// const API_BASE_URL = 'http://localhost:5000/api'
const API_BASE_URL = 'https://kwik-trade-clone.onrender.com/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})