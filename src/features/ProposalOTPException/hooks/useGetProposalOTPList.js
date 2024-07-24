import { useCallback, useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { buildQueryString } from '../../../utils/globalizationFunction';
import { COMMON_WORDS } from '../../../utils/constants';
import errorHandler from '../../../utils/errorHandler';
import { setTableName } from '../../../stores/slices/exportSlice';
import { useDispatch } from 'react-redux';
import apiUrls from '../../../utils/apiUrls';

function useGetProposalOTPList(page, pageSize, order, orderBy) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0);

  const dispatch = useDispatch();

  const fetchProposalOtp = useCallback(
    async (query, searched, date) => {
      try {
        setLoading(true);
        let params = buildQueryString({
          pageNo: page,
          sortKey: orderBy,
          sortOrder: order,
          pageSize: pageSize,
          childFieldsToFetch: COMMON_WORDS.PRODUCER + ',' + COMMON_WORDS.LOB + ',' + COMMON_WORDS.PRODUCT,
          childFieldsEdge: COMMON_WORDS.HAS_PRODUCER + ',' + COMMON_WORDS.HAS_LOB + ',' + COMMON_WORDS.HAS_PRODUCT,
        });
        if (query && searched) {
          params += '&searchKey=' + searched + '&searchString=' + query;
        }
        if (date?.startDate && date?.endDate) {
          params += `&startDate=${date.startDate}&endDate=${date.endDate}`;
        }

        let url = `${apiUrls.proposalOtpException}?${params}`;

        const response = await axiosInstance.get(url);

        const { data } = response;

        const newData = data.data.map((item) => {
          const {
            lob,
            proposalOtpException: { id, startDate, endDate, status, createdAt, updatedAt, label },
            producer,
            product,
          } = item;

          const producerName = `${producer?.[0]?.firstName ?? ''} ${producer?.[0]?.lastName ?? ''}`.trim();
          const lobName = lob?.[0]?.lob ?? '';
          const productName = product?.[0]?.product ?? '';
          const type = producerName ? 'Producer' : 'Channel';

          return {
            id: id,
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
            label: label,
          };
        });

        dispatch(setTableName(newData[0]?.label));
        setTotalPage(data?.totalCount);
        setData(newData);
      } catch (error) {
        errorHandler.handleError(error);
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, pageSize, order, orderBy, dispatch]
  );

  useEffect(() => {
    fetchProposalOtp();
  }, [fetchProposalOtp]);

  return { data, loading, fetchProposalOtp, totalPage };
}

export default useGetProposalOTPList;
