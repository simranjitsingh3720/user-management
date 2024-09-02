import { useState, useCallback } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { COMMON_WORDS } from '../../../utils/constants';
import { formatDate } from '../../../utils/globalizationFunction';
import errorHandler from '../../../utils/errorHandler';
import toastifyUtils from '../../../utils/toastify';
import apiUrls from '../../../utils/apiUrls';

const useRevalidationList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const fetchData = useCallback(async ({ userId, page, pageSize, order, orderBy }) => {
    setLoading(true);
    try {
      const params = {
        id: userId,
        pageNo: page,
        pageSize: pageSize,
        sortOrder: order,
        sortKey: orderBy,
        childFieldsToFetch: `${COMMON_WORDS.REVALIDATION_LIST}`,
        childFieldsEdge: `${COMMON_WORDS.MANAGES}`,
      };
      const response = await axiosInstance.get(apiUrls.getUser, { params });

      if (response?.data?.data?.[0]?.revalidationList.length === undefined) {
        toastifyUtils.notifySuccess('No data found for the selected producer');
      }

      const transformedData =
        response?.data?.data?.[0]?.revalidationList.map((item) => {
          const { createdAt, updatedAt, status } = item;
          return {
            ...item,
            createdAt: formatDate(createdAt),
            updatedAt: formatDate(updatedAt),
            checked: status,
          };
        }) || [];
      setData(transformedData);
      setTotalCount(response?.data?.totalCount || 0);
    } catch (error) {
      setData([]);
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update Single Record
  const updateData = useCallback(async ({ payload, data, row, updateList }) => {
    try {
      const url = `${apiUrls.getUser}/${row.id}/deo-user`;
      const response = await axiosInstance.put(url, payload);
      toastifyUtils.notifySuccess(response?.data?.message);

      const transformedData = data.map((item) => {
        if (item.id === row.id) {
          return {
            ...item,
            checked: payload.fields.status,
            status: payload.fields.status,
          };
        }
        return item;
      });

      if (updateList) {
        updateList({ id: row.id, data });
      }
      setData(transformedData);
    } catch (error) {
      errorHandler.handleError(error);
    }
  }, []);

  return {
    revalidationList: data,
    revalidationListLoading: loading,
    revalidationListFetchData: fetchData,
    revalidationListUpdateData: updateData,
    pageTotalCount: totalCount,
  };
};

export default useRevalidationList;
