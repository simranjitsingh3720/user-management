import { useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { COMMON_ERROR } from '../../../utils/globalConstants';

function useUpdateRole(id, setChangeStatusOpen) {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function UpdateDataFun(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.put(`/api/role/${id}`, data);
      toast.success(response?.data?.message || 'Role updated successfully');
      navigate('/roles');
      if (setChangeStatusOpen) setChangeStatusOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || COMMON_ERROR);
    } finally {
      setLoading(false);
    }
  }
  return { UpdateDataFun, updateLoading: loading };
}

export default useUpdateRole;
