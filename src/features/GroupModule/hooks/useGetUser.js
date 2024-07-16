import apiUrls from '../../../utils/apiUrls';
import axiosInstance from '../../../utils/axiosInstance';

import { useEffect, useState } from 'react';
import { buildQueryString } from '../../../utils/globalizationFunction';

function useGetUser(input) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const params = {
        pageNo: 0,
        pageSize: 1000,
        status: true,
      };
      let url = `${apiUrls.getUser}?${buildQueryString(params)}`;
      if (input) {
        const params = {
          searchKey: 'firstName',
          searchString: input,
        };
        url += `&${buildQueryString(params)}`;
      }
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
  }, [input]);

  return {
    userData: data,
    userLoading: loading,
    userFetchData: fetchData,
  };
}

export default useGetUser;
