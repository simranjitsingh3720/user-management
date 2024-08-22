import { useCallback, useState } from 'react';
import apiUrls from '../../../utils/apiUrls';
import axiosInstance from '../../../utils/axiosInstance';
import { COMMON_WORDS } from '../../../utils/constants';

function useGetLocation() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLocation = useCallback(async (userID) => {
    try {
      setLoading(true);

      const url = `${apiUrls.getUser}/${userID}/${COMMON_WORDS.LOCATIONS}`;
      const response = await axiosInstance.get(url);

      setData(response?.data);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, fetchLocation };
}

export default useGetLocation;
