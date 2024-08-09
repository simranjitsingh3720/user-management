import { useCallback, useState } from 'react';
import axiosInstance from './../../../../utils/axiosInstance';
import { buildQueryString, formatDate } from '../../../../utils/globalizationFunction';
import apiUrls from '../../../../utils/apiUrls';

const useGetBulkUpload = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const getBulkUpload = useCallback(
    async ({ pageNo, pageSize, searchString, searchKey, searched, query, sortKey, sortOrder } = {}) => {
      setLoading(true);
      try {
        const queryParams = buildQueryString({
          searchString: `${searchString}${query ? `,${query}` : ''}`,
          searchKey: `${searchKey}${searched ? `,${searched}` : ''}`,
          pageNo,
          pageSize,
          sortOrder,
          sortKey,
        });
        const response = await axiosInstance.get(`${apiUrls.getBulkUploadHistory}?${queryParams}`);

        const { data } = response;
        const transformedData = data?.data?.map((item) => {
          return {
            ...item,
            fileSyncDateTime: formatDate(item.fileSyncDateTime),
            fileUploadDateTime: formatDate(item.fileUploadDateTime),
          };
        });

        setData(transformedData);
        setTotalCount(data.totalCount);
      } catch (e) {
        setData([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    getBulkUpload,
    bulkUploadData: data,
    bulkploadLoading: loading,
    totalCount,
    setData,
  };
};

export default useGetBulkUpload;
