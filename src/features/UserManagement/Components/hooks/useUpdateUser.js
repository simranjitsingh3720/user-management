import { useState } from 'react';
import axiosInstance from '../../../../utils/axiosInstance';
import apiUrls from '../../../../utils/apiUrls';
import { COMMON, NAVIGATE } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import errorHandler from '../../../../utils/errorHandler';
import { useDispatch } from 'react-redux';
import { hideDialog } from '../../../../stores/slices/dialogSlice';
import toastifyUtils from '../../../../utils/toastify';

export default function useUpdateUser() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function updateData(id, roleId, roleName, data, fetchData) {
    setLoading(true);
    let payload;
    payload = {
      id: id,
      roleId,
      roleName,
      fields: data,
    };
    try {
      const response = await axiosInstance.put(`${apiUrls.getUser}`, payload);
      toastifyUtils.notifySuccess(response?.data?.message || COMMON.USER_UPDATED_SUCCESS);
      navigate(NAVIGATE.NAVIGATE_TO_USER_MANAGEMENT);
      dispatch(hideDialog());
      if (fetchData) {
        fetchData();
      }
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  }
  return { updateData, updateUserLoading: loading };
}
