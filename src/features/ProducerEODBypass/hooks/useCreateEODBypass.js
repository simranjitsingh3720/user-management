import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosInstance';
import apiUrls from '../../../utils/apiUrls';
import errorHandler from '../../../utils/errorHandler';
import toastifyUtils from '../../../utils/toastify';

function useCreateEODBypass() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function postData(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`${apiUrls.getEodByPass}`, data);
      toastifyUtils.notifySuccess(response?.data?.message || 'Producer EOD Created successfully');
      navigate('/producer-eod-bypass-list');
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  }
  async function UpdateDataFun(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.put(`${apiUrls.getEodByPass}`, data);
      toastifyUtils.notifySuccess(response?.data?.message || 'EOD Producer updated successfully');
      navigate('/producer-eod-bypass-list');
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  }
  return { postData, loading, UpdateDataFun };
}

export default useCreateEODBypass;
