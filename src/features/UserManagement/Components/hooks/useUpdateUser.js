import { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../../../utils/axiosInstance';
import { COMMON_ERROR } from '../../../../utils/globalConstants';
import apiUrls from '../../../../utils/apiUrls';
import { useDispatch } from 'react-redux';
import { hideDialog } from '../../../../stores/slices/dialogSlice';
import { USER_UPDATED_SUCCESS } from '../utils/constants';

export default function useUpdateUser(fetchData) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  async function updateData(id, data) {
    setLoading(true);

    let payload;
    payload = {
      id: id,
      fields: {
        status: !data,
      },
    };
    try {
      const response = await axiosInstance.put(`${apiUrls.getUser}`, payload);
      toast.success(response?.data?.message || USER_UPDATED_SUCCESS);
      dispatch(hideDialog());
      fetchData();
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || COMMON_ERROR);
      dispatch(hideDialog());
    } finally {
      setLoading(false);
    }
  }
  return { updateData, updateUserLoading: loading };
}
