import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Recordings API
export const recordingsAPI = {
  getAll: (params = {}) => api.get('/recordings', { params }),
  getById: (id) => api.get(`/recordings/${id}`),
  create: (data) => api.post('/recordings', data),
  update: (id, data) => api.patch(`/recordings/${id}`, data),
  delete: (id) => api.delete(`/recordings/${id}`),
};

// Storage API
export const storageAPI = {
  getInfo: () => api.get('/storage/info'),
  deleteFile: (filename) => api.delete(`/storage/file/${filename}`),
};

// Processing API
export const processingAPI = {
  process: (data) => api.post('/processing/process', data),
};

// Upload API
export const uploadAPI = {
  uploadVideo: async (file, filename) => {
    const formData = new FormData();
    formData.append('file', file, filename);
    
    return axios.post(`${API_BASE_URL}/upload/video`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default api;
