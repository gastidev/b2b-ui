import axios from 'axios';
import { clearSession } from './auth';

export const gastiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

gastiClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('authorization');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar token expirado
gastiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Limpiar la sesión y redirigir al login
      clearSession();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);
