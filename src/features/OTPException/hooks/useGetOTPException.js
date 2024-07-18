import { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { buildQueryString } from '../../../utils/globalizationFunction';
import { COMMON_WORDS } from '../../../utils/constants';
import apiUrls from '../../../utils/apiUrls';

function useGetOTPException(page, pageSize, order, orderBy) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  const fetchData = async (searched, query) => {
    try {
      setLoading(true);
      let params = buildQueryString({
        pageNo: page,
        sortKey: orderBy,
        sortOrder: order,
        pageSize: pageSize,
        childFieldsToFetch: `${COMMON_WORDS.PRODUCER},${COMMON_WORDS.CHANNEL}`,
        childFieldsEdge: `${COMMON_WORDS.HAS_PRODUCER},${COMMON_WORDS.HAS_CHANNEL}`,
      });

      if (query && searched) {
        params = buildQueryString({
          pageNo: page,
          sortKey: orderBy,
          sortOrder: order,
          pageSize: pageSize,
          searchKey: searched,
          searchString: query,
          childFieldsToFetch: `${COMMON_WORDS.PRODUCER},${COMMON_WORDS.CHANNEL}`,
          childFieldsEdge: `${COMMON_WORDS.HAS_PRODUCER},${COMMON_WORDS.HAS_CHANNEL}`,
        });
      }

      let url = `${apiUrls.getOTPException}?${params}`;
      const response = await axiosInstance.get(url);
      const { data = {} } = response;
      const { totalCount = 0 } = data;
      const setOTPData = response?.data?.data?.map((item) => {
        const { channel, otpException, producer } = item;
        return {
          id: otpException?.id,
          label: otpException?.label,
          type: otpException?.type,
          producerName: producer.length
            ? `${producer[0].firstName || ''} ${producer[0].lastName || ''}`
            : channel[0]?.txtChannelName,
          status: otpException?.status,
          producerCode: otpException?.type === 'producer' ? producer[0]?.producerCode : channel[0]?.numChannelCode,
          createdAt: otpException?.createdAt,
          updatedAt: otpException?.updatedAt,
          checked: otpException?.status,
        };
      });
      setCount(totalCount);
      setData(setOTPData);
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

export default useGetOTPException;
