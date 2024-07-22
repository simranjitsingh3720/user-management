import { useEffect, useState, useCallback } from 'react';
import axiosInstance from '../utils/axiosInstance';
import apiUrls from '../utils/apiUrls';

function useGetUserData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${apiUrls.getUser}?searchString=Producer&searchKey=userType`);
      setData(response?.data?.data || []);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    userData: data,
    userLoading: loading,
    userFetchData: fetchData,
  };
}

export default useGetUserData;
