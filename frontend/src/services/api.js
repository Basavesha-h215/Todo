import axios from 'axios';

// Get the backend URL from environment variable or use localhost for development
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

// Create axios instance
const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Set Content-Type dynamically based on data type
    if (config.data instanceof FormData) {
      // Don't set Content-Type for FormData - let browser set it with boundary
      delete config.headers['Content-Type'];
    } else {
      config.headers['Content-Type'] = 'application/json';
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${BACKEND_URL}/api/token/refresh/`, {
            refresh: refreshToken,
          });

          const { access } = response.data;
          localStorage.setItem('access_token', access);

          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  register: (data) => api.post('/api/register/', data),
  login: (data) => api.post('/api/login/', data),
  profile: () => api.get('/api/profile/'),
};

export const postsAPI = {
  getPosts: () => api.get('/api/posts/'),
  getPublicPosts: () => api.get('/api/public/posts/'),
  createPost: (data) => api.post('/api/posts/', data),
  getPost: (id) => api.get(`/api/posts/${id}/`),
  updatePost: (id, data) => api.put(`/api/posts/${id}/`, data),
  deletePost: (id) => api.delete(`/api/posts/${id}/`),
};

export const commentsAPI = {
  createComment: (postId, data) => api.post(`/api/posts/${postId}/comments/`, data),
};

export default api;
