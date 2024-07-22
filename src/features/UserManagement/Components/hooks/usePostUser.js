import { useState } from 'react';
import axiosInstance from '../../../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiUrls from '../../../../utils/apiUrls';
import { COMMON_ERROR } from '../../../../utils/globalConstants';
import { COMMON, NAVIGATE } from '../utils/constants';

export default function usePostUser() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function postData(data) {
    setLoading(true);
    try {
      const url = apiUrls.postUserCreation;
      const response = await axiosInstance.post(url, data);
      toast.success(response?.data?.message || COMMON.USER_CREATION_SUCCESS);
      navigate(NAVIGATE.NAVIGATE_TO_USER_MANAGEMENT);
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || error?.response?.data?.details || COMMON_ERROR);
    } finally {
      setLoading(false);
    }
  }
  return { postData, loading };
}
