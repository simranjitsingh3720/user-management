import { useCallback, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import apiUrls from '../../../utils/apiUrls';
import { COMMON_WORDS } from '../../../utils/constants';
import { buildQueryString, formatDate } from '../../../utils/globalizationFunction';

function useGetEmployeeData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  const fetchData = useCallback(async ({ page, pageSize, order, orderBy, searched, searchData }) => {
    try {
      setLoading(true);
      let params = {
        pageNo: page,
        sortKey: orderBy,
        sortOrder: order,
        pageSize: pageSize,
        searchString: searchData ? `${COMMON_WORDS.UNDERWRITER},${searchData}` : COMMON_WORDS.UNDERWRITER,
        searchKey: searched ? `${COMMON_WORDS.ROLE_NAME},${searched}` : COMMON_WORDS.ROLE_NAME,
      };

      let url = `${apiUrls.getUser}?${buildQueryString(params)}`;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, fetchData, count };
}

export default useGetEmployeeData;
