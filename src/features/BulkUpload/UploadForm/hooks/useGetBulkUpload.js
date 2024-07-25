import { useCallback, useState } from 'react';
import axiosInstance from './../../../../utils/axiosInstance';
import { buildQueryString } from '../../../../utils/globalizationFunction';
import apiUrls from '../../../../utils/apiUrls';

const useGetBulkUpload = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const getBulkUpload = useCallback(async ({pageNo, pageSize, searchString, searchKey, searched, query} = {}) => {
    setLoading(true);
    console.log(pageNo, pageSize, searchString, searchKey, searched, query);
    try {
      const queryParams = buildQueryString({
        searchString: `${searchString}${query? `,${query}`: ''}`,
        searchKey: `${searchKey}${searched? `,${searched}`: ''}`,
        pageNo,
        pageSize,
      });

      const response = await axiosInstance.get(`${apiUrls.getBulkUploadHistory}?${queryParams}`);
      setData(response.data.data);
      setTotalCount(response.data.totalCount);
    } catch (e) {
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    getBulkUpload,
    bulkUploadData: data,
    bulkploadLoading: loading,
    totalCount,
    setData
  };
};

export default useGetBulkUpload;
