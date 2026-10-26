import { apiClient, getAuthHeaders } from './api';

export const fetchProjects = async (token) => {
  const response = await apiClient.get('/api/proyectos/lista', {
    headers: getAuthHeaders(token),
  });
  return response.data || [];
};

export const saveProject = (project, editingId, token) => {
  const config = { headers: getAuthHeaders(token) };

  if (editingId) {
    return apiClient.put(`/api/proyectos/${editingId}`, { id: editingId, ...project }, config);
  }

  return apiClient.post('/api/proyectos', project, config);
};

export const deleteProject = (projectId, token) =>
  apiClient.delete(`/api/proyectos/${projectId}`, {
    headers: getAuthHeaders(token),
  });