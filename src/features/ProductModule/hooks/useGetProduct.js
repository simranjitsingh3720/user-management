import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { buildQueryString } from "../../../utils/globalizationFunction"; 
import { COMMON_WORDS } from "../../../utils/constants";

function useGetProduct(pageChange, rowsPage) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState({
    sortKey: "createdAt",
    sortOrder: "asc",
  });

  const fetchData = async (resultIds) => {
    try {
      let queryParams = buildQueryString({pageNo: pageChange-1, pageSize: rowsPage, sortKey: sort.sortKey, sortOrder: sort.sortOrder,childFieldsToFetch: COMMON_WORDS.LOB, childFieldsEdge: COMMON_WORDS.HAS_LOB});

      if(resultIds) {
        queryParams = buildQueryString({pageNo: pageChange-1, pageSize: rowsPage, sortKey: sort.sortKey, sortOrder: sort.sortOrder,childFieldsToFetch: COMMON_WORDS.LOB, childFieldsEdge: COMMON_WORDS.HAS_LOB, isExclusive: true, ids: resultIds, edge: COMMON_WORDS.HAS_LOB});
      }

      setLoading(true);
      let url = `/api/product?${queryParams}`;
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
  }, [pageChange, sort, rowsPage]);

  return { data, loading, sort, setSort, fetchData };
}

export default useGetProduct;
