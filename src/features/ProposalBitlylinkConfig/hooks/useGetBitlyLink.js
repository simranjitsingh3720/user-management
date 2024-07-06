import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { buildQueryString } from "../../../utils/globalizationFunction";
import { COMMON_WORDS } from "../../../utils/constants";

function useGetBitlyLink(pageChange, rowsPage, query, searched) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState({
    sortKey: "createdAt",
    sortOrder: "asc",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      let queryParams = buildQueryString({
        pageNo: pageChange - 1,
        pageSize: rowsPage,
        sortKey: sort.sortKey,
        sortOrder: sort.sortOrder,
        childFieldsToFetch: COMMON_WORDS.PRODUCER,
        childFieldsEdge: COMMON_WORDS.HAS_PRODUCER,
      });

      if (query && searched) {
        queryParams = buildQueryString({
          pageNo: pageChange - 1,
          pageSize: rowsPage,
          sortKey: sort.sortKey,
          sortOrder: sort.sortOrder,
          childFieldsToFetch: COMMON_WORDS.PRODUCER,
          childFieldsEdge: COMMON_WORDS.HAS_PRODUCER,
          searchKey: searched,
          searchString: query
        });
      }

      let url = `/api/proposal-bitly-config?${queryParams}`;

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
  }, [pageChange, sort, rowsPage, query]);

  return { data, loading, sort, setSort, fetchData };
}

export default useGetBitlyLink;
