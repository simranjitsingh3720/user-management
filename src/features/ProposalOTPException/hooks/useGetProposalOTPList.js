import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import { COMMON_ERROR } from "../../../utils/globalConstants";
import { buildQueryString } from "../../../utils/globalizationFunction";
import { COMMON_WORDS } from "../../../utils/constants";

function useGetProposalOTPList(pageChange, rowsPage, query, searched, date) {
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
        childFieldsToFetch: COMMON_WORDS.PRODUCER +","+ COMMON_WORDS.LOB + "," + COMMON_WORDS.PRODUCT,
        childFieldsEdge: COMMON_WORDS.HAS_PRODUCER +","+ COMMON_WORDS.HAS_LOB + "," + COMMON_WORDS.HAS_PRODUCT,
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
          childFieldsToFetch: COMMON_WORDS.PRODUCER +","+ COMMON_WORDS.LOB + "," + COMMON_WORDS.PRODUCT,
          childFieldsEdge: COMMON_WORDS.HAS_PRODUCER +","+ COMMON_WORDS.HAS_LOB + "," + COMMON_WORDS.HAS_PRODUCT,
        });
      }
      if (date?.startDate && date?.endDate) {
        params = buildQueryString({
          pageNo: pageChange - 1,
          sortKey: sort.sortKey,
          sortOrder: sort.sortOrder,
          pageSize: rowsPage,
          startDate: date.startDate,
          endDate: date.endDate,
          childFieldsToFetch: COMMON_WORDS.PRODUCER +","+ COMMON_WORDS.LOB + "," + COMMON_WORDS.PRODUCT,
        childFieldsEdge: COMMON_WORDS.HAS_PRODUCER +","+ COMMON_WORDS.HAS_LOB + "," + COMMON_WORDS.HAS_PRODUCT,
        });
      }

      let url = `/api/otp-exception?${params}`;

      const response = await axiosInstance.get(url);
      setData(response.data);
    } catch (error) {
      toast.error(
        error?.response?.data?.details || COMMON_ERROR
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [pageChange, sort, rowsPage, query, date]);

  return { data, loading, sort, setSort, fetchData };
}

export default useGetProposalOTPList;
