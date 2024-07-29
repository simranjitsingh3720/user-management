import { useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { buildQueryString } from '../../../utils/globalizationFunction';
import { COMMON_WORDS } from '../../../utils/constants';
import apiUrls from '../../../utils/apiUrls';
import errorHandler from '../../../utils/errorHandler';

function useGetOTPException() {
  const [otpExceptionList, setOtpExceptionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const fetchData = async ({ page, pageSize, order, orderBy, searched, query }) => {
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

      let url = `${apiUrls.getOTPException}?${params}`;

      if (query && searched) {
        const params = {
          searchKey: searched,
          searchString: query,
        };
        url += `&${buildQueryString(params)}`;
      }

      const response = await axiosInstance.get(url);
      const { data = {} } = response;
      const { totalCount = 0 } = data;
      const setOTPData = response?.data?.data?.map((item) => {
        const { channel, otpException, producer } = item;
        const { id, label, type, status, createdAt, updatedAt } = otpException;
        return {
          id: id,
          label: label,
          type: type,
          producerName: producer.length
            ? `${producer[0].firstName || ''} ${producer[0].lastName || ''}`
            : channel?.[0]?.txtChannelName,
          status: status,
          producerCode: type === COMMON_WORDS.PRODUCER ? producer[0]?.producerCode : channel?.[0]?.numChannelCode,
          createdAt: createdAt,
          updatedAt: updatedAt,
          checked: status,
        };
      });
      setTotalCount(totalCount);
      setOtpExceptionList(setOTPData);
    } catch (error) {
      setOtpExceptionList([]);
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { otpExceptionList, loading, fetchData, totalCount };
}

export default useGetOTPException;
