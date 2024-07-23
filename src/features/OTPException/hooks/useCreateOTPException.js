import { useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { toast } from 'react-toastify';
import errorHandler from '../../../utils/errorHandler';
import { useNavigate } from 'react-router-dom';
import apiUrls from '../../../utils/apiUrls';

function useCreateOTPException({ fetchData }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  async function postData(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`${apiUrls.getOTPException}`, data);
      toast.success(response?.data?.message || 'OTP Exception created successfully');
      navigate('/otpexception');
      fetchData();
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  }
  return { postData, loading };
}

export default useCreateOTPException;
