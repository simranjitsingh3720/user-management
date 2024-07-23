import { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../../../utils/axiosInstance';
import apiUrls from '../../../../utils/apiUrls';
import { COMMON, NAVIGATE } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import errorHandler from '../../../../utils/errorHandler';

export default function useUpdateUser() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function updateData(id, roleId, roleName, data) {
    setLoading(true);
    let payload;
    payload = {
      id: id,
      roleId,roleName,
      fields: data
    };
    try {
      const response = await axiosInstance.put(`${apiUrls.getUser}`, payload);
      toast.success(response?.data?.message || COMMON.USER_UPDATED_SUCCESS);
      navigate(NAVIGATE.NAVIGATE_TO_USER_MANAGEMENT);
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  }
  return { updateData, updateUserLoading: loading };
}
