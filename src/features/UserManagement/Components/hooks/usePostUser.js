import { useState } from 'react';
import axiosInstance from '../../../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import apiUrls from '../../../../utils/apiUrls';
import { COMMON, NAVIGATE } from '../utils/constants';
import errorHandler from '../../../../utils/errorHandler';
import toastifyUtils from '../../../../utils/toastify';

export default function usePostUser() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function postData(data) {
    setLoading(true);
    try {
      const url = apiUrls.postUserCreation;
      const response = await axiosInstance.post(url, data);
      toastifyUtils.notifySuccess(response?.data?.message || COMMON.USER_CREATION_SUCCESS);
      navigate(NAVIGATE.NAVIGATE_TO_USER_MANAGEMENT);
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  }
  return { postData, loading };
}
