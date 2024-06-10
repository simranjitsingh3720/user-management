import { useEffect, useState } from "react";
import axiosInstance from "../../../core/axiosInstance";

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
      let url = `/api/proposal-otp-exception?pageNo=${pageChange - 1}&sortKey=${
        sort.sortKey
      }&sortOrder=${sort.sortOrder}&pageSize=${rowsPage}`;

      if (query && searched)
        url += `&searchKey=${searched}&searchString=${query}`;
      if (date?.startDate && date?.endDate)
        url += `&startDate=${date.startDate}&endDate=${date.endDate}`;

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
  }, [pageChange, sort, rowsPage, query, date]);

  return { data, loading, sort, setSort, fetchData };
}

export default useGetProposalOTPList;
