import { useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { COMMON_WORDS } from '../../../utils/constants';
import { buildQueryString } from '../../../utils/globalizationFunction';
import apiUrls from '../../../utils/apiUrls';

function useGetEmployeeByProducer() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (producerId) => {
    try {
      let params = {
        id: producerId,
        // edge: COMMON_WORDS.HAS_PRODUCER,
        // isExclusive: true,
        childFieldsToFetch: `${COMMON_WORDS.PRODUCTS},${COMMON_WORDS.PRODUCER}`,
        childFieldsEdge: `${COMMON_WORDS.HAS_PRODUCT},${COMMON_WORDS.HAS_PRODUCER}`,
      };
      let url = `/${apiUrls.employeeFlag}?${buildQueryString(params)}`;

      const response = await axiosInstance.get(url);
      setData(response.data);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, fetchData, setLoading };
}

export default useGetEmployeeByProducer;
