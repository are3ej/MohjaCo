import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token and error handling to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific error cases
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          console.error('Forbidden access');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('API Error:', error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

export const auth = {
  login: async (username, password) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },
  
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
};

export const equipment = {
  getAll: async (params = {}) => {
    try {
      const { page = 1, limit = 6, filter = 'all', search = '' } = params;
      const response = await api.get('/equipment', {
        params: { page, limit, filter, search }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch equipment');
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/equipment/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch equipment details');
    }
  },

  create: async (data) => {
    try {
      const formData = new FormData();
      
      // Add text fields
      Object.keys(data).forEach(key => {
        if (key !== 'images') {
          formData.append(key, data[key]);
        }
      });

      // Add images
      if (data.images) {
        data.images.forEach(image => {
          formData.append('images', image);
        });
      }

      const response = await api.post('/equipment', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create equipment');
    }
  },

  update: async (id, data) => {
    try {
      const formData = new FormData();
      
      // Add text fields
      Object.keys(data).forEach(key => {
        if (key !== 'images') {
          formData.append(key, data[key]);
        }
      });

      // Add images
      if (data.images) {
        data.images.forEach(image => {
          formData.append('images', image);
        });
      }

      const response = await api.put(`/equipment/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update equipment');
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/equipment/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete equipment');
    }
  },

  bulkDelete: async (ids) => {
    try {
      const response = await api.post('/equipment/bulk-delete', { ids });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete equipment items');
    }
  },

  search: async (query) => {
    try {
      const response = await api.get('/equipment/search', {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Search failed');
    }
  }
};

export default api;
