import { useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import errorHandler from '../../../utils/errorHandler';
import apiUrls from '../../../utils/apiUrls';
import { useDispatch } from 'react-redux';
import { hideDialog } from '../../../stores/slices/dialogSlice';
import toastifyUtils from '../../../utils/toastify';

function useUpdateBitlyLink(fetchData) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function UpdateDataFun(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.put(apiUrls.proposalBitlyConfig, data);
      toastifyUtils.notifySuccess(response?.data?.message || 'Proposal bitly config successfully');
      dispatch(hideDialog());
      fetchData();
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  }
  return { UpdateDataFun, updateLoading: loading };
}

export default useUpdateBitlyLink;
