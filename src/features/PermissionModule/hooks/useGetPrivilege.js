import axiosInstance from '../../../utils/axiosInstance';

import { useState } from 'react';
import apiUrls from '../../../utils/apiUrls';
import { buildQueryString, formatDate } from '../../../utils/globalizationFunction';
import errorHandler from '../../../utils/errorHandler';

function useGetPrivilege() {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const fetchPermission = async (page, pageSize, order, orderBy, searched, query) => {
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
          createdAt: formatDate(item.createdAt),
          updatedAt: formatDate(item.updatedAt),
          checked: item.status,
        })) || [];

      setPermissions(transformedData);
      setTotalCount(totalCount);
    } catch (error) {
      setPermissions([]);
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { permissions, loading, fetchPermission, totalCount };
}

export default useGetPrivilege;
