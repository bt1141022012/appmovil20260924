import axios from 'axios';

export const API_BASE_URL = 'https://disreputable-spooky-vampire-jj4w46wjg5pxcjv4-8080.app.github.dev';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAuthHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
});
