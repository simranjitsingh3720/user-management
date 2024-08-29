import { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import errorHandler from '../../../utils/errorHandler';

function useGetSyncedProducer(pageChange, rowsPage, query, searched) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState({
    sortKey: 'createdAt',
    sortOrder: 'asc',
  });

  const fetchData = async (data = null, resultProducersId = null) => {
    try {
      setLoading(true);
      let url = `/api/producer-eod-bypass?pageNo=${pageChange - 1}&sortKey=${sort.sortKey}&sortOrder=${
        sort.sortOrder
      }&pageSize=${rowsPage}`;

      if (query && searched) {
        url += `&searchKey=${searched}&searchString=${query}`;
      } else if (searched === 'producers' && resultProducersId) {
        url += `&producers=${resultProducersId}`;
      }
      const response = await axiosInstance.get(url);
      setData(response.data);
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageChange, sort, rowsPage, query]);

  return { data, loading, sort, setSort, fetchData };
}

export default useGetSyncedProducer;
