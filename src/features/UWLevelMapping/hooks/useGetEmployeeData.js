import { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import apiUrls from '../../../utils/apiUrls';
import { COMMON_WORDS } from '../../../utils/constants';
import { buildQueryString, formatDate } from '../../../utils/globalizationFunction';

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
        searchString: resultProductString
          ? `${COMMON_WORDS.UNDERWRITER},${resultProductString}`
          : COMMON_WORDS.UNDERWRITER,
        searchKey: searched ? `${COMMON_WORDS.ROLE_NAME},${searched}` : COMMON_WORDS.ROLE_NAME,
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
        const { id, label, firstName, lastName, employeeId, email, createdAt, updatedAt } = item;
        return {
          id: id,
          label: label,
          userName: `${firstName ?? ''} ${lastName ?? ''}`.trim(),
          employeeId: employeeId,
          email: email,
          createdAt: formatDate(createdAt),
          updatedAt: formatDate(updatedAt),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, order, orderBy, pageSize]);

  return { data, loading, fetchData, count };
}

export default useGetEmployeeData;
