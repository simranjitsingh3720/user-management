import { useCallback } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from './../../../../utils/axiosInstance';
import { COMMON_ERROR } from './../../../../utils/globalConstants';
import apiUrls from '../../../../utils/apiUrls';

const useSubmit = () => {
  const getUserById = useCallback(async (id) => {
    try {
      let url = `${apiUrls.getUser}/${id}`;
      const { data: responseData } = await axiosInstance.get(url);
      return responseData.data;
    } catch (e) {
      toast.error(e?.response?.data?.error?.message || COMMON_ERROR);
      return null;
    }
  }, []);

  return { getUserById };
};

export default useSubmit;
