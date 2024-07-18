import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL, COMMON_ERROR, TOKEN } from './globalConstants';
import errorHandler from './errorHandler';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorMessage = '';
    if (error.response) {
      switch (error.response.status) {
        case 400:
        case 403:
        case 404:
        case 500:
          errorMessage = error?.response?.data?.error?.message;
          break;
        case 401:
          localStorage.clear();
          toast.error('Session expired. Please login again');
          window.location.href = '/';
          break;
        default:
          errorMessage = COMMON_ERROR;
      }
    } else if (error.request) {
      errorMessage = 'No response received';
    } else {
      errorMessage = error.message;
      errorHandler.handleError(error);
    }
    toast.error(errorMessage);
    return Promise.reject(error);
  }
);

export default instance;
