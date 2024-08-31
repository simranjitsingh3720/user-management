import { useCallback, useState } from 'react';
import apiUrls from '../utils/apiUrls';
import axiosInstance from '../utils/axiosInstance';
import { COMMON_WORDS } from '../utils/constants';

function useGetProducts() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProduct = useCallback(async (userID, lobId) => {
    try {
      setLoading(true);

      let url = `${apiUrls.getUser}/${userID}/${COMMON_WORDS.LOB}/${lobId}`;

      const response = await axiosInstance.get(url);

      setData(response?.data);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, fetchProduct };
}

export default useGetProducts;
