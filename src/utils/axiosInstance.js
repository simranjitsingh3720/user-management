import axios from 'axios';
import { BASE_URL, COMMON_ERROR, TOKEN } from './globalConstants';
import errorHandler from './errorHandler';
import toastifyUtils from './toastify';
import persistStore from 'redux-persist/es/persistStore';
import { appStore } from '../stores/appStore';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
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
    const { response } = error;
    const persistor = persistStore(appStore);

    if (response) {
      const { status, data } = response;
      switch (status) {
        case 400:
        case 403:
        case 404:
        case 500:
          errorMessage = data?.error?.message ? data?.error?.message : data?.details;
          break;
        case 401:
          errorMessage = data?.error?.message;
          setTimeout(() => {
            localStorage.clear();
            persistor.purge();
            window.location.href = '/';
          }, 2000);
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
    toastifyUtils.notifyError(errorMessage);
    return Promise.reject(error);
  }
);

const apiClient = {
  get: (url, config = {}) => instance.get(url, config),
  post: (url, data, config = {}) => instance.post(url, data, config),
  put: (url, data, config = {}) => instance.put(url, data, config),
  patch: (url, data, config = {}) => instance.patch(url, data, config),
};

export default apiClient;
