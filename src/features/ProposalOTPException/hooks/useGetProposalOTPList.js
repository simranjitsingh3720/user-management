import { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { buildQueryString } from '../../../utils/globalizationFunction';
import { COMMON_WORDS } from '../../../utils/constants';
import errorHandler from '../../../utils/errorHandler';

function useGetProposalOTPList(pageChange, rowsPage, query, searched, date) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const [sort, setSort] = useState({
    sortKey: 'createdAt',
    sortOrder: 'asc',
  });

  const fetchData = async () => {
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
      if (query && searched) {
        params += '&searchKey=' + searched + '&searchString=' + query;
      }
      if (date?.startDate && date?.endDate) {
        params += `&startDate=${date.startDate}&endDate=${date.endDate}`;
      }

      let url = `/api/otp-exception?${params}`;

      const response = await axiosInstance.get(url);

      const { data } = response;

      const newData = data.data.map((item) => {
        const {
          lob,
          otpException: { type, startDate, endDate, status, createdAt, updatedAt },
          producer,
          product,
        } = item;

        const producerName = `${producer?.[0]?.firstName ?? ''} ${producer?.[0]?.lastName ?? ''}`.trim();
        const lobName = lob?.[0]?.name ?? '';
        const productName = product?.[0]?.name ?? '';

        return {
          type: type,
          producerName,
          lob: lobName,
          product: productName,
          startDate: startDate,
          endDate: endDate,
          createdAt: createdAt,
          updatedAt: updatedAt,
          status: status,
          checked: status,
        };
      });
      debugger;
      setTotalPage(data?.totalCount);
      setData(newData);
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [pageChange, sort, rowsPage, query, date]);

  return { data, loading, sort, setSort, fetchData, totalPage };
}

export default useGetProposalOTPList;
