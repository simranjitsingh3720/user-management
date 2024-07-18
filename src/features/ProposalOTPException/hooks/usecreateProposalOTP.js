import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosInstance';
import { toast } from 'react-toastify';
import errorHandler from '../../../utils/errorHandler';

function useCreateProposalOTP() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function postData(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/api/proposal-otp-exception', data);
      toast.success(response?.data?.message || 'Proposal OTP Created successfully');
      navigate('/proposalOtpException');
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  }
  return { postData, loading };
}

export default useCreateProposalOTP;
