import { useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import errorHandler from '../../../utils/errorHandler';
import apiUrls from '../../../utils/apiUrls';
import { useNavigate } from 'react-router-dom';
import toastifyUtils from '../../../utils/toastify';

function useCreateBitlyLink() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function postData(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.post(apiUrls.proposalBitlyConfig, data);
      toastifyUtils.notifySuccess(response?.data?.message || 'Proposal Bitly created successfully');
      navigate('/proposal-bitly-config/');
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  }
  return { postData, loading };
}

export default useCreateBitlyLink;
