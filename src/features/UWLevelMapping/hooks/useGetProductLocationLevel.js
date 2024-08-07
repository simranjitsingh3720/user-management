import { useEffect, useState, useCallback } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import apiUrls from '../../../utils/apiUrls';
import { COMMON_WORDS } from '../../../utils/constants';
import { buildQueryString, formatDate } from '../../../utils/globalizationFunction';
import errorHandler from '../../../utils/errorHandler';

function useGetProductLocationLevel(page, pageSize, order, orderBy, employeeId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const params = {
        pageNo: page,
        sortKey: orderBy,
        sortOrder: order,
        pageSize,
        childFieldsToFetch: `${COMMON_WORDS.PRODUCTS},${COMMON_WORDS.LOBS},${COMMON_WORDS.LOCATIONS}`,
        childFieldsEdge: `${COMMON_WORDS.HAS_PRODUCT},${COMMON_WORDS.HAS_LOB},${COMMON_WORDS.HAS_LOCATION}`,
        searchKey: 'userId',
        searchString: employeeId,
      };

      let url = `${apiUrls.productLocationLevelMapping}?${buildQueryString(params)}`;

      const response = await axiosInstance.get(url);

      const formattedData = response.data.data.map((item) => {
        const { productLocationLevelMappings = {}, products = [], lobs = [], locations = [] } = item;

        const {
          id = '',
          label = '',
          level = '',
          status = '',
          createdAt = '',
          updatedAt = '',
        } = productLocationLevelMappings;

        const { lob = '' } = lobs[0] || {};
        const { product = '' } = products[0] || {};
        const { txtOffice: location = '' } = locations[0] || {};

        return {
          id,
          label,
          lob,
          product,
          location,
          level,
          status,
          createdAt: formatDate(createdAt),
          updatedAt: formatDate(updatedAt),
          checked: status,
        };
      });

      setCount(response.data.totalCount ?? 0);
      setData(formattedData);
    } catch (error) {
      errorHandler.handleError(error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [page, order, orderBy, pageSize, employeeId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, fetchData, count };
}

export default useGetProductLocationLevel;
