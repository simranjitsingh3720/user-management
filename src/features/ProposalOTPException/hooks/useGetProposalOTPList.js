import { useCallback, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { buildQueryString, formatDate } from '../../../utils/globalizationFunction';
import { COMMON_WORDS } from '../../../utils/constants';
import errorHandler from '../../../utils/errorHandler';
import { setExtraColumns, setTableName } from '../../../stores/slices/exportSlice';
import { useDispatch } from 'react-redux';
import apiUrls from '../../../utils/apiUrls';
import { EXPORT_COLUMNS } from '../utils/constants';

function useGetProposalOTPList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0);

  const dispatch = useDispatch();

  const fetchProposalOtp = useCallback(
    async ({ page, pageSize, order, orderBy, id = null, searched = null, date = null, resultId } = {}) => {
      try {
        setLoading(true);
        let params = buildQueryString({
          id: id,
          pageNo: page,
          sortKey: orderBy,
          sortOrder: order,
          pageSize: pageSize,
          childFieldsToFetch: `${COMMON_WORDS.PRODUCER},${COMMON_WORDS.LOB},${COMMON_WORDS.PRODUCT},${COMMON_WORDS.CHANNEL}`,
          childFieldsEdge: `${COMMON_WORDS.HAS_PRODUCER},${COMMON_WORDS.HAS_LOB},${COMMON_WORDS.HAS_PRODUCT},${COMMON_WORDS.HAS_CHANNEL}`,
        });

        if (searched && resultId) {
          let searchParams = {
            edge: searched === COMMON_WORDS.CHANNEL ? COMMON_WORDS.HAS_CHANNEL : COMMON_WORDS.HAS_PRODUCER,
            isExclusive: true,
            ids: resultId,
          };
          params += `&${buildQueryString(searchParams)}`;
        }

        if (date?.startDate && date?.endDate) {
          params += `&startDate=${date.startDate}&endDate=${date.endDate}`;
        }

        let url = `${apiUrls.proposalOtpException}?${params}`;

        const response = await axiosInstance.get(url);

        const { data } = response;

        if (id) {
          return data.data;
        }

        const newData = data.data.map((item) => {
          const {
            lob,
            proposalOtpException: { id, startDate, endDate, status, createdAt, updatedAt, label, isChannel },
            channel,
            producer,
            product,
          } = item;

          let name = '';
          const lobName = lob?.[0]?.lob ?? '';
          const productName = product?.[0]?.product ?? '';

          if (isChannel) {
            name = `${channel?.[0]?.txtChannelName ?? ''}`;
          } else {
            name = `${producer?.[0]?.firstName ?? ''} ${producer?.[0]?.lastName ?? ''}`;
          }

          return {
            id: id,
            type: isChannel ? 'Channel' : 'Producer',
            producerName: name,
            lob: lobName,
            product: productName,
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
            createdAt: formatDate(createdAt),
            updatedAt: formatDate(updatedAt),
            status: status,
            checked: status,
            label: label,
          };
        });

        dispatch(setTableName(newData[0]?.label));
        dispatch(setExtraColumns(EXPORT_COLUMNS));
        setTotalPage(data?.totalCount);
        setData(newData);
      } catch (error) {
        errorHandler.handleError(error);
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { data, loading, fetchProposalOtp, totalPage, setData };
}

export default useGetProposalOTPList;
