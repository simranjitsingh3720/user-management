import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
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
        params += '&searchKey=' + searched + '&searchString=' + query;
      } 
      if (date?.startDate && date?.endDate) {
        params += `&startDate=${date.startDate}&endDate=${date.endDate}`;
      }

      let url = `/api/otp-exception?${params}`;

      const response = await axiosInstance.get(url);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
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
