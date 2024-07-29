import { useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { toast } from 'react-toastify';
import errorHandler from '../../../utils/errorHandler';
import apiUrls from '../../../utils/apiUrls';
import { useNavigate } from 'react-router-dom';

function useCreateBitlyLink() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function postData(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.post(apiUrls.proposalBitlyConfig, data);
      toast.success(response?.data?.message || 'Proposal Bitly created successfully');
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
