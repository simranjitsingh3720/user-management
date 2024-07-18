import { useCallback } from 'react';
import axiosInstance from './../../../../utils/axiosInstance';
import apiUrls from '../../../../utils/apiUrls';

const useSubmit = () => {
  const getUserById = useCallback(async (id) => {
    try {
      let url = `${apiUrls.getUser}/${id}`;
      const { data: responseData } = await axiosInstance.get(url);
      return responseData.data;
    } catch (e) {
      return null;
    }
  }, []);

  return { getUserById };
};

export default useSubmit;
