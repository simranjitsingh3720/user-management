import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { API_END_POINTS, COMMON_WORDS } from "../../../utils/constants";
import { buildQueryString } from "../../../utils/globalizationFunction";

function useGetCkycData(page, pageSize, order, orderBy) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (searched, resultProductString) => {
    try {
      setLoading(true);
      let params = {
        pageNo: page,
        sortKey: orderBy,
        sortOrder: order,
        pageSize: pageSize,
        childFieldsToFetch: `${COMMON_WORDS.PRODUCTS},${COMMON_WORDS.LOBS}`,
        childFieldsEdge: `${COMMON_WORDS.HASPRODUCT},${COMMON_WORDS.HASLOB}`,
      };

      let url = `/${API_END_POINTS.CKYC}?${buildQueryString(params)}`;

      if (searched === COMMON_WORDS.PRODUCT && resultProductString) {
        const params = {
          edge: COMMON_WORDS.HASPRODUCT,
          ids: resultProductString,
          isExclusive: true,
        };
        url += `&${buildQueryString(params)}`;
      }
      if (searched === COMMON_WORDS.LOB && resultProductString) {
        url += `&${buildQueryString(params)}`;
      }
      const response = await axiosInstance.get(url);
      setData(response.data);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page, order, orderBy, pageSize]);

  return { data, loading, fetchData };
}

export default useGetCkycData;
