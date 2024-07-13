import apiUrls from '../../../utils/apiUrls';
import axiosInstance from '../../../utils/axiosInstance';

import { useEffect, useState } from 'react';
import { buildQueryString } from '../../../utils/globalizationFunction';

function useGetPermission() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const params = {
        isAll: true,
        status: true,
      };
      let url = `${apiUrls.getPermission}?${buildQueryString(params)}`;

      const response = await axiosInstance.get(url);
      setData(response.data);
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
    permissionData: data,
    permissionLoading: loading,
    permissionFetchDatat: fetchData,
  };
}

export default useGetPermission;
