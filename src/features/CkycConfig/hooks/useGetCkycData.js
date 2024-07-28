import { useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import apiUrls from '../../../utils/apiUrls';
import { COMMON_WORDS } from '../../../utils/constants';
import { buildQueryString } from '../../../utils/globalizationFunction';
import errorHandler from '../../../utils/errorHandler';

function useGetCkycData() {
  const [ckycList, setCkycList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async ({page, pageSize, order, orderBy, searched, resultProductString, query}) => {
    try {
      setLoading(true);
      let params = {
        pageNo: page,
        sortKey: orderBy,
        sortOrder: order,
        pageSize: pageSize,
        childFieldsToFetch: `${COMMON_WORDS.PRODUCTS},${COMMON_WORDS.LOBS}`,
        childFieldsEdge: `${COMMON_WORDS.HAS_PRODUCT},${COMMON_WORDS.HAS_LOB}`,
      };

      let url = `${apiUrls.ckyc}?${buildQueryString(params)}`;

      if (searched === COMMON_WORDS.PRODUCT && resultProductString) {
        const params = {
          edge: COMMON_WORDS.HAS_PRODUCT,
          ids: resultProductString,
          isExclusive: true,
        };
        url += `&${buildQueryString(params)}`;
      }
      if (searched === COMMON_WORDS.LOB && resultProductString) {
        const params = {
          edge: COMMON_WORDS.HAS_LOB,
          ids: resultProductString,
          isExclusive: true,
        };
        url += `&${buildQueryString(params)}`;
      }
      if (query) {
        const params = {
          searchKey: searched,
          searchString: query,
        };
        url += `&${buildQueryString(params)}`;
      }
      const response = await axiosInstance.get(url);
      setCkycList(response.data);
    } catch (error) {
      setCkycList([]);
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { ckycList, loading, fetchData };
}

export default useGetCkycData;
