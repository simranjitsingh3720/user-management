import { useState } from 'react';
import axiosInstance from '../../../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiUrls from '../../../../utils/apiUrls';
import { NAVIGATE_TO_USER_MANAGEMENT, USER_CREATION_SUCCESS } from '../utils/constants';
import errorHandler from '../../../../utils/errorHandler';

export default function usePostUser() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function postData(data) {
    setLoading(true);
    try {
      const url = apiUrls.postUserCreation;
      const response = await axiosInstance.post(url, data);
      toast.success(response?.data?.message || USER_CREATION_SUCCESS);
      navigate(NAVIGATE_TO_USER_MANAGEMENT);
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  }
  return { postData, loading };
}
