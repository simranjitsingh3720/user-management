import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { COMMON_WORDS } from "../../../utils/constants";
import { buildQueryString } from "../../../utils/globalizationFunction";
import apiUrls from "../../../utils/apiUrls";

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
        childFieldsEdge: `${COMMON_WORDS.HAS_PAYMENT_TYPE},${COMMON_WORDS.HAS_LOB},${COMMON_WORDS.HAS_PRODUCT}`,
      };

      let url = `/${apiUrls.paymentProduct}?${buildQueryString(params)}`;
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
