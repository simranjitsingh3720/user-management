import axios from 'axios';
import { BASE_URL, TOKEN } from '../utils/globalConstants';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

const isTokenExpired = () => {
  const token = localStorage.getItem(TOKEN);
  if (!token) return true;
  return false;
};

// Axios request interceptor to add token to requests
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Axios response interceptor to handle token expiration
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isTokenExpired()) {
        localStorage.removeItem(TOKEN);
        window.location.href = '/';
        return Promise.reject(error);
      }

      const token = localStorage.getItem(TOKEN);
      if (token) {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
