import { useState } from 'react';
import axiosInstance from '../../../../utils/axiosInstance';
import apiUrls from '../../../../utils/apiUrls';
import { buildQueryString } from '../../../../utils/globalizationFunction';
import errorHandler from '../../../../utils/errorHandler';
import { COMMON_WORDS } from '../../../../utils/constants';

export default function useGetUser() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const fetchUserList = async ({page, pageSize, order, orderBy, searched, query}) => {
    setLoading(true);
    try {
      const params = buildQueryString({
        pageNo: page,
        sortOrder: order,
        sortKey: orderBy,
        pageSize,
        searchString: query ? query : '',
        searchKey: query ? searched : '',
        childFieldsToFetch: COMMON_WORDS.ROLE,
        childFieldsEdge: COMMON_WORDS.HAS_ROLE,
      });
      const { data } = await axiosInstance.get(`${apiUrls.getUser}?${params}`);
      setUserList(data);
      setTotalCount(data.totalCount);
    } catch (error) {
      setUserList([]);
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { userList, loading, fetchUserList, totalCount };
}
