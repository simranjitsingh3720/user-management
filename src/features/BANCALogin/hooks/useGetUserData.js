import { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import apiUrls from '../../../utils/apiUrls';
import { buildQueryString } from '../../../utils/globalizationFunction';
import { COMMON_WORDS } from '../../../utils/constants';

function useGetUserData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      let params = {
        searchKey: COMMON_WORDS.ROLE_NAME,
        searchString: COMMON_WORDS.PRODUCER,
        status: true,
        isAll: true
      };
      let url = `${apiUrls.getUser}?${buildQueryString(params)}`;
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
