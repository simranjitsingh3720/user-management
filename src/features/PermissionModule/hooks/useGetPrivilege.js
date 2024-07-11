import axiosInstance from '../../../utils/axiosInstance';

import { useEffect, useState } from 'react';
import apiUrls from '../../../utils/apiUrls';
import { buildQueryString } from '../../../utils/globalizationFunction';

function useGetPrivilege(page, pageSize, order, orderBy) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  const fetchData = async (searched, query) => {
    try {
      setLoading(true);
      let params = {
        pageNo: page,
        sortKey: orderBy,
        sortOrder: order,
        pageSize: pageSize,
      };

      let url = `${apiUrls.getPermission}?${buildQueryString(params)}`;
      if (query) {
        let params = {
          searchKey: searched,
          searchString: query,
        };
        url += `&${buildQueryString(params)}`;
      }
      const response = await axiosInstance.get(url);
      const { data = {} } = response;
      const { totalCount = 0 } = data;
      const transformedData =
        response?.data?.data.map((item) => ({
          ...item,
          checked: item.status,
        })) || [];
      setData(transformedData);
      setCount(totalCount);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page, pageSize, order, orderBy]);

  return { data, loading, fetchData, setLoading, count };
}

export default useGetPrivilege;
