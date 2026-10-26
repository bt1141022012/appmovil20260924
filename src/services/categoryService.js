import { apiClient, getAuthHeaders } from './api';

export const fetchCategories = async (token) => {
  const response = await apiClient.get('/api/categorias/lista', {
    headers: getAuthHeaders(token),
  });
  return response.data || [];
};

export const createCategory = (category, token) =>
  apiClient.post('/api/categorias', category, {
    headers: getAuthHeaders(token),
  });

export const updateCategory = (categoryId, category, token) =>
  apiClient.put(`/api/categorias/${categoryId}`, category, {
    headers: getAuthHeaders(token),
  });

export const deleteCategory = (categoryId, token) =>
  apiClient.delete(`/api/categorias/${categoryId}`, {
    headers: getAuthHeaders(token),
  });