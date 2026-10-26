import { apiClient } from './api';

export const loginUser = async (login, clave) => {
  const response = await apiClient.post('/api/auth/login', { login, clave });
  return response.data;
};

export const registerUser = async (user) => {
  const response = await apiClient.post('/api/auth/registro', user);
  return response.data;
};