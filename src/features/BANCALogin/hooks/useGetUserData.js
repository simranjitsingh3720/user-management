import { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';

function useGetUserData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      let url = `/api/user?pageNo=0&searchKey=roleName&searchString=Producer&status=true`;
      // if (input) {
      //   url += `&searchKey=firstName&searchString=${input}`;
      // }
      const response = await axiosInstance.get(url);
      setData(response?.data?.data);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return {
    userData: data,
    userLoading: loading,
    userFetchData: fetchData,
  };
}

export default useGetUserData;
