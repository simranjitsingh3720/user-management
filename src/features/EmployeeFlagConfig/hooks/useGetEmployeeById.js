import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { API_END_POINTS, COMMON_WORDS } from "../../../utils/constants";
import { buildQueryString } from "../../../utils/globalizationFunction";

function useGetEmployeeByProducer() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (producerId) => {
    try {
      let params = {
        ids: producerId,
        edge: COMMON_WORDS.HASPRODUCER,
        isExclusive: true,
        childFieldsToFetch: COMMON_WORDS.PRODUCTS,
        childFieldsEdge: COMMON_WORDS.HASPRODUCT,
      };
      let url = `/${API_END_POINTS.EMPLOYEEFLAG}?${buildQueryString(params)}`;

      const response = await axiosInstance.get(url);
      setData(response.data);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, fetchData, setLoading };
}

export default useGetEmployeeByProducer;
