import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export const auth = {
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  }
};

export const equipment = {
  getAll: async () => {
    const response = await api.get('/equipment');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/equipment/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/equipment', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/equipment/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/equipment/${id}`);
    return response.data;
  }
};

export default api;
