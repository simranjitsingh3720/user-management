import { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../../../utils/axiosInstance';
import { COMMON_ERROR } from '../../../../utils/globalConstants';
import apiUrls from '../../../../utils/apiUrls';
import { COMMON, NAVIGATE } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

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
      //fetchData();
      navigate(NAVIGATE.NAVIGATE_TO_USER_MANAGEMENT);
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || COMMON_ERROR);
    } finally {
      setLoading(false);
    }
  }
  return { updateData, updateUserLoading: loading };
}
