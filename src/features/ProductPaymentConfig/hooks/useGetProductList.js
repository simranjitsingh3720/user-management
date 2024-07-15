import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { buildQueryString } from "../../../utils/globalizationFunction";
import apiUrls from "../../../utils/apiUrls";

function useGetProductList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (lobId) => {
    try {
      setLoading(true);
      const params = buildQueryString({ ids: lobId, edge: 'hasLob', isExclusive: true, status: true });
      const url = `${apiUrls.getProduct}?${params}`;
      const response = await axiosInstance.get(url);
      setData(response.data);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, fetchData };
}

export default useGetProductList;
