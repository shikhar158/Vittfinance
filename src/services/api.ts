import axios from 'axios'
import { useVittStore } from '../store/useVittStore'

const api = axios.create({
  baseURL: import.meta.env.NEXT_PUBLIC_API_BASE || '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to attach JWT Authorization headers 
api.interceptors.request.use((config) => {
  const token = useVittStore.getState().token
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
