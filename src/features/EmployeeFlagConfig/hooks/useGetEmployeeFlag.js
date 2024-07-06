import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { API_END_POINTS, COMMON_WORDS } from "../../../utils/constants";
import { buildQueryString } from "../../../utils/globalizationFunction";

function useGetEmployeeFlag(page, pageSize, order, orderBy) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (resultProducersId) => {
    try {
      setLoading(true);
      let params = {
        pageNo: page,
        sortKey: orderBy,
        sortOrder: order,
        pageSize: pageSize,
        childFieldsToFetch: `${COMMON_WORDS.PRODUCER},${COMMON_WORDS.PRODUCTS}`,
        childFieldsEdge: `${COMMON_WORDS.HASPRODUCER},${COMMON_WORDS.HASPRODUCT}`,
      };

      let url = `/${API_END_POINTS.EMPLOYEEFLAG}?${buildQueryString(params)}`;

      if (resultProducersId) {
        const params = {
          edge: COMMON_WORDS.HASPRODUCER,
          ids: resultProducersId,
          isExclusive: true,
        };
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
  }, [page, pageSize, order, orderBy]);

  return { data, loading, fetchData };
}

export default useGetEmployeeFlag;
