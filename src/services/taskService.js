import { apiClient, getAuthHeaders } from './api';

export const fetchTasks = async (token) => {
  const response = await apiClient.get('/api/tareas/lista', {
    headers: getAuthHeaders(token),
  });
  return response.data || [];
};

export const createTask = (task, token) =>
  apiClient.post('/api/tareas', task, {
    headers: getAuthHeaders(token),
  });

export const toggleTaskState = (taskId, currentState, token) => {
  const nextState = currentState === 'PENDIENTE' ? 'COMPLETADO' : 'PENDIENTE';
  return apiClient.patch(
    '/api/tareas',
    { id: taskId, estado: nextState },
    { headers: getAuthHeaders(token) }
  );
};

export const deleteTask = (taskId, token) =>
  apiClient.delete(`/api/tareas/${taskId}`, {
    headers: getAuthHeaders(token),
  });