import { useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import errorHandler from '../../../utils/errorHandler';


function useUpdateRole(id, setChangeStatusOpen, fetchList) {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function UpdateDataFun(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.put(`/api/role/${id}`, data);
      toast.success(response?.data?.message || 'Role updated successfully');
      navigate('/roles');
      if (setChangeStatusOpen) setChangeStatusOpen(false);
      if (fetchList) fetchList();
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  }
  return { UpdateDataFun, updateLoading: loading };
}

export default useUpdateRole;
