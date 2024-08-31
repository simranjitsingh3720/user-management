import { useState, useCallback } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { API_END_POINTS } from '../constants';
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
          const { id, dataEntryUserName, email, mobileNo, createdAt, updatedAt, producerStatus, label } = item;
          return {
            id,
            dataEntryUserName,
            email,
            mobileNo,
            createdAt: formatDate(createdAt),
            updatedAt: formatDate(updatedAt),
            checked: producerStatus,
            producerStatus,
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
