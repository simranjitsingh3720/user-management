import { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { buildQueryString } from '../../../utils/globalizationFunction';
import { COMMON_WORDS } from '../../../utils/constants';
import apiUrls from '../../../utils/apiUrls';

function useGetBitlyLink(page, pageSize, order, orderBy) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      let queryParams = buildQueryString({
        pageNo: page,
        pageSize,
        sortKey: orderBy,
        sortOrder: order,
        childFieldsToFetch: `${COMMON_WORDS.PRODUCER},${COMMON_WORDS.CHANNEL}`,
        childFieldsEdge: `${COMMON_WORDS.HAS_PRODUCER},${COMMON_WORDS.HAS_CHANNEL}`,
      });

      let url = `${apiUrls.proposalBitlyConfig}?${queryParams}`;

      const response = await axiosInstance.get(url);

      const transformedData =
        response?.data?.data?.map((item) => {
          const {
            proposalBitlyConfig: { id, createdAt, updatedAt, label, status },
            producer = {},
            channel = {},
          } = item;

          const { firstName = '', lastName = '', producerCode = '' } = producer?.[0] || {};

          const { txtChannelName = '', numChannelCode = '' } = channel?.[0] || {};
          return {
            type: producer.length ? 'Producer' : 'Channel',
            id: id,
            userName: producer.length ? `${firstName || ''} ${lastName || ''}` : txtChannelName,
            producerCode: producer.length ? producerCode : numChannelCode,
            createdAt,
            updatedAt,
            checked: status,
            status,
            label,
            showIcon: producer.length ? true : false,
          };
        }) || [];

      setCount(response?.data?.totalCount);

      setData(transformedData);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page, pageSize, order, orderBy]);

  return { data, loading, fetchData, count };
}

export default useGetBitlyLink;
