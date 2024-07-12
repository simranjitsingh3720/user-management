import { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { toast } from 'react-toastify';
import { COMMON_ERROR } from '../../../utils/globalConstants';
import { COMMON_WORDS } from '../../../utils/constants';
import { buildQueryString } from '../../../utils/globalizationFunction';

function useGetEODBypass(pageChange, rowsPage, date) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState({
    sortKey: 'createdAt',
    sortOrder: 'asc',
  });

  const fetchData = async (resultProducersId = null) => {
    try {
      setLoading(true);
      let params = buildQueryString({
        pageNo: pageChange - 1,
        sortKey: sort.sortKey,
        sortOrder: sort.sortOrder,
        pageSize: rowsPage,
        childFieldsToFetch: COMMON_WORDS.PRODUCER + ',' + COMMON_WORDS.LOB + ',' + COMMON_WORDS.PRODUCT,
        childFieldsEdge: COMMON_WORDS.HAS_PRODUCER + ',' + COMMON_WORDS.HAS_LOB + ',' + COMMON_WORDS.HAS_PRODUCT,
      });

      if (resultProducersId) {
        params += `&ids=${resultProducersId}&isExclusive=true&edge=${COMMON_WORDS.HAS_PRODUCER}`;
      }
      if (date?.startDate && date?.endDate) {
        params += `&startDate=${date.startDate}&endDate=${date.endDate}`;
      }

      let url = `/api/producer-eod-bypass?${params}`;
      const response = await axiosInstance.get(url);
      setData(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.details || COMMON_ERROR);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [pageChange, sort, rowsPage, date]);

  return { data, loading, sort, setSort, fetchData };
}

export default useGetEODBypass;
