import { useState, useCallback, useEffect } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { API_END_POINTS } from '../constants';
import { toast } from 'react-toastify';
import { COMMON_WORDS } from '../../../utils/constants';
import { buildQueryString } from '../../../utils/globalizationFunction';
import errorHandler from '../../../utils/errorHandler';

const useRevalidationList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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

      const transformedData =
        response?.data?.data?.map((item) => {
          const { producer, revalidationList: { id, emailId, mobileNo, createdAt, updatedAt, status, label } } = item;
          return {
            id: id,
            userName: `${producer?.[0].firstName} ${producer?.[0].lastName}`,
            emailId: emailId,
            mobileNo: mobileNo,
            createdAt: createdAt,
            updatedAt: updatedAt,
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

  const updateData = useCallback(async (updatedData) => {
    const transformedData = updatedData.map((item) => ({
      ...item,
      status: item.checked,
    }));

    // Create payload with only the updated items
    const payload = transformedData.map((item) => ({
      id: item.id,
      properties: {
        status: item.checked,
      },
    }));

    try {
      await axiosInstance.put(API_END_POINTS.updateRevalidationList, payload);
      toast.success('Data updated successfully');
      setData(transformedData);
    } catch (error) {
      errorHandler.handleError(error);
    }
  }, []);

  // Effect to trigger when data changes
  useEffect(() => {}, [data]);

  return {
    revalidationList: data,
    revalidationListLoading: loading,
    revalidationListFetchData: fetchData,
    revalidationListUpdateData: updateData,
    pageTotalCount: totalCount,
  };
};

export default useRevalidationList;
