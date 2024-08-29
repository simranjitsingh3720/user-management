import { useState, useCallback } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { API_END_POINTS } from '../constants';
import { COMMON_WORDS } from '../../../utils/constants';
import { buildQueryString, formatDate } from '../../../utils/globalizationFunction';
import errorHandler from '../../../utils/errorHandler';
import toastifyUtils from '../../../utils/toastify';

const useRevalidationList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const fetchData = useCallback(async ({ userId, page, pageSize, order, orderBy }) => {
    setLoading(true);
    const queryParams = buildQueryString({
      ids: userId,
      edge: COMMON_WORDS.HAS_PRODUCER,
      isExclusive: true,
      pageNo: page,
      pageSize: pageSize,
      sortOrder: order,
      sortKey: orderBy,
      childFieldsToFetch: COMMON_WORDS.PRODUCER,
      childFieldsEdge: COMMON_WORDS.HAS_PRODUCER,
    });
    try {
      const response = await axiosInstance.get(API_END_POINTS.getRevalidationList + queryParams);

      if (response?.data?.data?.length === 0) {
        toastifyUtils.notifySuccess('No data found for the selected producer');
      }

      const transformedData =
        response?.data?.data?.map((item) => {
          const {
            revalidationList: { id, name, emailId, mobileNo, createdAt, updatedAt, status, label },
          } = item;
          return {
            id,
            name,
            emailId,
            mobileNo,
            createdAt: formatDate(createdAt),
            updatedAt: formatDate(updatedAt),
            checked: status,
            status,
            label,
          };
        }) || [];
      setData(transformedData);
      setTotalCount(response?.data?.totalCount || 0);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateData = useCallback(async ({ payload, data, row, updateList }) => {
    try {
      await axiosInstance.put(API_END_POINTS.updateRevalidationList, payload);
      toastifyUtils.notifySuccess('Data updated successfully');

      const transformedData = data.map((item) => {
        const newItem = payload.find((payloadItem) => item.id === payloadItem.id);
        if (newItem) {
          return {
            ...item,
            checked: newItem.properties.status,
            status: newItem.properties.status,
          };
        }
        return item;
      });

      if (updateList) {
        if (payload.length > 1) {
          updateList({ data: transformedData });
        } else {
          updateList({ id: row.id, data });
        }
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
