import { useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { buildQueryString } from '../../../utils/globalizationFunction';
import { COMMON_WORDS } from '../../../utils/constants';
import apiUrls from '../../../utils/apiUrls';

function useGetBitlyLink() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  const fetchData = async ({ page, pageSize, order, orderBy, searched, resultId }) => {
    try {
      setLoading(true);
      let queryParams = buildQueryString({
        pageNo: page,
        pageSize,
        sortKey: orderBy,
        sortOrder: order,
        childFieldsToFetch: `${COMMON_WORDS.PRODUCER},${COMMON_WORDS.CHANNEL},${COMMON_WORDS.PRODUCTS}`,
        childFieldsEdge: `${COMMON_WORDS.HAS_PRODUCER},${COMMON_WORDS.HAS_CHANNEL},${COMMON_WORDS.HAS_PRODUCT}`,
      });

      if (searched && resultId) {
        let searchParams = {
          edge: searched === COMMON_WORDS.CHANNEL ? COMMON_WORDS.HAS_CHANNEL : COMMON_WORDS.HAS_PRODUCER,
          isExclusive: true,
          ids: resultId,
        };
        queryParams += `&${buildQueryString(searchParams)}`;
      }

      let url = `${apiUrls.proposalBitlyConfig}?${queryParams}`;

      const response = await axiosInstance.get(url);

      const transformedData =
        response?.data?.data?.map((item) => {
          const {
            proposalBitlyConfig: { id, createdAt, updatedAt, label, status, fields = {} },
            producer = {},
            channel = {},
            products = [],
          } = item;

          const { isMandatory = true } = fields;

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
            products,
            showData: channel.length ? (isMandatory ? 'Yes' : 'No') : null,
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

  return { data, loading, fetchData, count };
}

export default useGetBitlyLink;
