import { useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { toast } from 'react-toastify';
import errorHandler from '../../../utils/errorHandler';
import { hideDialog } from '../../../stores/slices/dialogSlice';
import apiUrls from '../../../utils/apiUrls';
import { useDispatch } from 'react-redux';

function useUpdateOTPException(fetchData) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  async function UpdateDataFun(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.put(`${apiUrls.getOTPException}`, data);
      toast.success(response?.data?.message || 'Proposal updated successfully');
      fetchData();
      dispatch(hideDialog());
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  }
  return { UpdateDataFun, updateLoading: loading };
}

export default useUpdateOTPException;
