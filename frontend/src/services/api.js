import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Set content type for JSON requests (but not for FormData)
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
            refresh: refreshToken,
          });
          
          localStorage.setItem('access_token', response.data.access);
          api.defaults.headers.Authorization = `Bearer ${response.data.access}`;
          
          return api(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register/', userData),
  login: (credentials) => api.post('/auth/login/', credentials),
  getProfile: () => api.get('/auth/profile/'),
  updateProfile: (userData) => api.put('/auth/profile/', userData),
};

// Posts API
export const postsAPI = {
  getAllPosts: () => api.get('/posts/'),
  getPost: (id) => api.get(`/posts/${id}/`),
  createPost: (postData) => api.post('/posts/', postData),
  updatePost: (id, postData) => api.put(`/posts/${id}/`, postData),
  deletePost: (id) => api.delete(`/posts/${id}/`),
  getPublicPosts: () => api.get('/public/posts/'),
};

// Comments API
export const commentsAPI = {
  createComment: (postId, commentData) => api.post(`/posts/${postId}/comments/`, commentData),
};

export default api;
