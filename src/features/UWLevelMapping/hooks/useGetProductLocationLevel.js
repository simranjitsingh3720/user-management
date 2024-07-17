import { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import apiUrls from '../../../utils/apiUrls';
import { COMMON_WORDS } from '../../../utils/constants';
import { buildQueryString } from '../../../utils/globalizationFunction';

function useGetProductLocationLevel(page, pageSize, order, orderBy, employeeId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  const fetchData = async (searched, resultProductString) => {
    try {
      setLoading(true);
      let params = {
        pageNo: page,
        sortKey: orderBy,
        sortOrder: order,
        pageSize: pageSize,
        childFieldsToFetch: `${COMMON_WORDS.PRODUCTS},${COMMON_WORDS.LOBS},${COMMON_WORDS.LOCATIONS}`,
        childFieldsEdge: `${COMMON_WORDS.HAS_PRODUCT},${COMMON_WORDS.HAS_LOB},${COMMON_WORDS.HAS_LOCATION}`,
        searchKey: 'userId',
        searchString: employeeId,
      };

      let url = `${apiUrls.productLocationLevelMapping}?${buildQueryString(params)}`;

      if (searched === COMMON_WORDS.PRODUCT && resultProductString) {
        const params = {
          edge: COMMON_WORDS.HAS_PRODUCT,
          ids: resultProductString,
          isExclusive: true,
        };
        url += `&${buildQueryString(params)}`;
      }
      if (searched === COMMON_WORDS.LOB && resultProductString) {
        url += `&${buildQueryString(params)}`;
      }
      const response = await axiosInstance.get(url);
      const partnerNeftData = response.data.data.map((item) => {
        const { productLocationLevelMappings, products, lobs, locations } = item;
        return {
          id: productLocationLevelMappings.id,
          label: productLocationLevelMappings.label,
          lob: lobs[0].lob,
          product: products[0].product,
          location: locations[0].txtOffice,
          level: productLocationLevelMappings.level,
          status: productLocationLevelMappings.status,
          createdAt: productLocationLevelMappings.createdAt,
          updatedAt: productLocationLevelMappings.updatedAt,
          checked: productLocationLevelMappings.status,
        };
      });
      setCount(response.data.totalCount);
      setData(partnerNeftData);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page, order, orderBy, pageSize]);

  return { data, loading, fetchData, count };
}

export default useGetProductLocationLevel;
