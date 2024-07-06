import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { API_END_POINTS, COMMON_WORDS } from "../../../utils/constants";
import { buildQueryString } from "../../../utils/globalizationFunction";

function useGetPaymentConfig(pageChange, rowsPage) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState({
    sortKey: "createdAt",
    sortOrder: "asc",
  });

  const fetchData = async (searched, resultProductString) => {
    try {
      setLoading(true);
      let params = {
        pageNo: pageChange - 1,
        sortKey: sort.sortKey,
        sortOrder: sort.sortOrder,
        pageSize: rowsPage,
        childFieldsToFetch: `${COMMON_WORDS.PAYMENTS},${COMMON_WORDS.LOBS},${COMMON_WORDS.PRODUCTS}`,
        childFieldsEdge: `${COMMON_WORDS.HASPAYMENTTYPE},${COMMON_WORDS.HASLOB},${COMMON_WORDS.HASPRODUCT}`,
      };

      let url = `/${API_END_POINTS.PRODUCTPAYMENT}?${buildQueryString(params)}`;
      if (searched === COMMON_WORDS.PRODUCT && resultProductString) {
        const params = {
          edge: COMMON_WORDS.HASPRODUCT,
          ids: resultProductString,
          isExclusive: true,
        };
        url += `&${buildQueryString(params)}`;
      }
      if (searched === COMMON_WORDS.LOB && resultProductString) {
        const params = {
          edge: COMMON_WORDS.HASLOB,
          ids: resultProductString,
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
  }, [pageChange, sort, rowsPage]);

  return { data, loading, sort, setSort, fetchData };
}

export default useGetPaymentConfig;
