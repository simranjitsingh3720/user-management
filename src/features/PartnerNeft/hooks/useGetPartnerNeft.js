import { useCallback, useState } from 'react';
import { API_END_POINTS, VERFICATION_ENUM } from '../utils/constant';
import axiosInstance from './../../../utils/axiosInstance';
import { buildQueryString, formatDate } from '../../../utils/globalizationFunction';

const useGetPartnerNeft = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const getPartnerNeft = useCallback(
    async ({
      isAll,
      status,
      searchString,
      sortKey,
      sortOrder,
      searchKey,
      pageNo,
      pageSize,
      ids,
      edge,
      childFieldsToFetch,
      childFieldsEdge,
      endDate,
      startDate,
      isExclusive,
    } = {}) => {
      setLoading(true);
      try {
        const queryParams = buildQueryString({
          status,
          pageNo,
          pageSize,
          searchString,
          searchKey,
          sortKey,
          sortOrder,
          isAll,
          ids,
          edge,
          childFieldsToFetch,
          childFieldsEdge,
          endDate,
          startDate,
          isExclusive,
        });

        const response = await axiosInstance.get(`${API_END_POINTS.GET_API}?${queryParams}`);

        const partnerNeftData = response.data.data.map((item, index) => {
          const { partnerNeft: { label, id, verificationMethod, createdAt, updatedAt }, product, lob, producer } = item;
         
          return {
            id: id,
            label: label,
            lobId: lob?.[0]?.lob,
            product: product?.[0]?.product,
            producerName: `${producer?.[0]?.firstName} ${producer?.[0]?.lastName}`,
            producerCode: producer?.[0]?.producerCode,
            verificationMethod: VERFICATION_ENUM[verificationMethod],
            createdAt: formatDate(createdAt),
            updatedAt: formatDate(updatedAt),
          };
        });
        setData(partnerNeftData);
        setTotalCount(response.data.totalCount);
      } catch (e) {
        setData([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    getPartnerNeft,
    partnerNeftData: data,
    partnerNeftLoading: loading,
    totalCount,
  };
};

export default useGetPartnerNeft;
