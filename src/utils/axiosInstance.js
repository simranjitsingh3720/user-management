import axios from 'axios';
import { BASE_URL, TOKEN } from '../utils/globalConstants';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

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
    if (error.response.data.statusCode === 401) {
      localStorage.clear();      
      window.location.href = '/';
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default instance;
