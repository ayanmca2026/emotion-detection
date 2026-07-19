import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://emotion-detection-backend.onrender.com';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const predictEmotion = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await apiClient.post('/predict', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

export const getHealth = async () => {
  const response = await apiClient.get('/health');
  return response.data;
};

export const getModelInfo = async () => {
  const response = await apiClient.get('/model');
  return response.data;
};

export const getMetrics = async () => {
  const response = await apiClient.get('/metrics');
  return response.data;
};