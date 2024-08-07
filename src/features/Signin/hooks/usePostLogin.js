import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosInstance';

import { toast } from 'react-toastify';
import { DASHBOARD } from '../utils/constants';
import apiUrls from '../../../utils/apiUrls';
import errorHandler from '../../../utils/errorHandler';
import { CLIENT_TYPE, TOKEN } from '../../../utils/globalConstants';
import { COMMON_WORDS } from '../../../utils/constants';

export default function usePostLogin(setOtpScreen) {
  const [loginLoading, setLoginLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const navigate = useNavigate();

  async function postData(loginData) {
    setLoginLoading(true);
    try {
      loginData = { ...loginData, clientType: CLIENT_TYPE };
      const response = await axiosInstance.post(apiUrls.postLogin, loginData);
      const { data } = response.data;
      if (data?.token) {
        localStorage.setItem(TOKEN, data.token);
        localStorage.setItem(COMMON_WORDS.SCOPES, JSON.stringify(data.scopes));
        localStorage.setItem(COMMON_WORDS.USER, JSON.stringify(data.user));
        navigate(DASHBOARD);
      }
      if (setOtpScreen) setOtpScreen(true);
      toast.success(response?.data?.message || 'OTP sent successfully');
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoginLoading(false);
    }
  }

  async function verifyOTP(loginData) {
    setVerifyLoading(true);
    try {
      const response = await axiosInstance.post(apiUrls.verifyOTP, loginData);
      const { data } = response.data;
      if (data) {
        localStorage.setItem(TOKEN, data.token);
        localStorage.setItem(COMMON_WORDS.SCOPES, JSON.stringify(data.scopes));
        localStorage.setItem(COMMON_WORDS.USER, JSON.stringify(data.user));
        navigate(DASHBOARD);
      }
      toast.success(response?.data?.message || 'OTP Verify successfully');
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setVerifyLoading(false);
    }
  }
  return { postData, loginLoading, verifyLoading, verifyOTP };
}
