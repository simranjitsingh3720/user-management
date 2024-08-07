import { useState, useCallback } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { API_END_POINTS } from '../constants';
import { toast } from 'react-toastify';
import { COMMON_WORDS } from '../../../utils/constants';
import { buildQueryString, formatDate } from '../../../utils/globalizationFunction';
import errorHandler from '../../../utils/errorHandler';
import toastifyUtils from '../../../utils/toastify';

const useRevalidationList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const fetchData = useCallback(async ({ userId, page, pageSize }) => {
    setLoading(true);
    const queryParams = buildQueryString({
      ids: userId,
      edge: COMMON_WORDS.HAS_PRODUCER,
      isExclusive: true,
      pageNo: page,
      pageSize: pageSize,
      childFieldsToFetch: COMMON_WORDS.PRODUCER,
      childFieldsEdge: COMMON_WORDS.HAS_PRODUCER,
    });
    try {
      const response = await axiosInstance.get(API_END_POINTS.getRevalidationList + queryParams);

      if(response?.data?.data?.length === 0) {
        toastifyUtils.notifySuccess('No data found for the selected producer');
      }

      const transformedData =
        response?.data?.data?.map((item) => {
          const { revalidationList: { id, name, emailId, mobileNo, createdAt, updatedAt, status, label } } = item;
          return {
            id: id,
            userName: name,
            emailId: emailId,
            mobileNo: mobileNo,
            createdAt: formatDate(createdAt),
            updatedAt: formatDate(updatedAt),
            checked: status,
            status: status,
            label: label
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
      toast.success('Data updated successfully');

      const transformedData = data.map((item) => {
        const newItem = payload.filter((payloadItem) => item.id === payloadItem.id);
        if (newItem.length > 0) {
          return {
            ...item,
            checked: newItem[0].properties.status,
            status: newItem[0].properties.status
          };
        }
        return item;
      });

      if(updateList) {
        if(payload.length > 1) {
          updateList({ data: transformedData });
        } else
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
