import { useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { toast } from 'react-toastify';
import errorHandler from '../../../utils/errorHandler';
import apiUrls from '../../../utils/apiUrls';

function useUpdateBitlyLink(setChangeStatusOpen, fetchGroupList) {
  const [loading, setLoading] = useState(false);

  async function UpdateDataFun(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.put(apiUrls.proposalBitlyConfig, data);
      toast.success(response?.data?.message || 'Proposal bitly config successfully');
      setChangeStatusOpen(false);
      fetchGroupList();
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  }
  return { UpdateDataFun, updateLoading: loading };
}

export default useUpdateBitlyLink;
