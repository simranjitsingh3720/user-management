import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosInstance';
import errorHandler from '../../../utils/errorHandler';
import apiUrls from '../../../utils/apiUrls';
import toastifyUtils from '../../../utils/toastify';

function useCreateProposalOTP() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function postData(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.post(apiUrls.proposalOtpException, data);
      toastifyUtils.notifySuccess(response?.data?.message || 'Proposal OTP Created successfully');
      navigate('/proposalotpexception');
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  }
  return { postData, loading };
}

export default useCreateProposalOTP;
