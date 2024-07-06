import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { buildQueryString } from "../../../utils/globalizationFunction";
import { Search } from "@mui/icons-material";
import { COMMON_WORDS } from "../../../utils/constants";

function useGetOTPException(pageChange, rowsPage, query, searched) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState({
    sortKey: "createdAt",
    sortOrder: "asc",
  });

  const fetchData = async () => {
    try {
      setLoading(true);

      let params = buildQueryString({
        pageNo: pageChange - 1,
        sortKey: sort.sortKey,
        sortOrder: sort.sortOrder,
        pageSize: rowsPage,
        childFieldsToFetch: COMMON_WORDS.PRODUCER,
        childFieldsEdge: COMMON_WORDS.HAS_PRODUCER,
      });

      if (query && searched) {
        params = buildQueryString({
          pageNo: pageChange - 1,
          sortKey: sort.sortKey,
          sortOrder: sort.sortOrder,
          pageSize: rowsPage,
          ids: query,
          isExclusive: true,
          edge: COMMON_WORDS.HAS_PRODUCER,
          childFieldsToFetch: COMMON_WORDS.PRODUCER,
          childFieldsEdge: COMMON_WORDS.HAS_PRODUCER,
        });
      }

      let url = `/api/otp-exception?${params}`;

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

  return { data, loading, fetchData, setLoading, setSort, sort };
}

export default useGetOTPException;
