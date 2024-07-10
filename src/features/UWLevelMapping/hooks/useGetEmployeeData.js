import { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import apiUrls from '../../../utils/apiUrls';
import { COMMON_WORDS } from '../../../utils/constants';
import { buildQueryString } from '../../../utils/globalizationFunction';

function useGetEmployeeData(page, pageSize, order, orderBy) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  const fetchData = async (searched, resultProductString) => {
    try {
      setLoading(true);
      let params = {
        pageNo: page,
        sortKey: orderBy,
        sortOrder: order,
        pageSize: pageSize,
        searchString: COMMON_WORDS.UNDERWRITER,
        searchKey: COMMON_WORDS.ROLE_NAME,
      };

      let url = `${apiUrls.getUser}?${buildQueryString(params)}`;

      if (searched === COMMON_WORDS.PRODUCT && resultProductString) {
        const params = {
          edge: COMMON_WORDS.HAS_PRODUCT,
          ids: resultProductString,
          isExclusive: true,
        };
        url += `&${buildQueryString(params)}`;
      }
      if (searched === COMMON_WORDS.LOB && resultProductString) {
        url += `&${buildQueryString(params)}`;
      }
      const response = await axiosInstance.get(url);

      const userData = response.data.data.map((item) => {
        return {
          id: item.id,
          label: item.label,
          name: `${item.firstName} ${item.lastName}`,
          employeeId: item.employeeId,
          email: item.email,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      });
      setCount(response.data.totalCount);
      setData(userData);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page, order, orderBy, pageSize]);

  return { data, loading, fetchData, count };
}

export default useGetEmployeeData;
