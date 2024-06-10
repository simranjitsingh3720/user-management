import axiosInstance from "../../../utils/axiosInstance"; // Import the instance

import { useEffect, useState } from "react";

function useGetPrivilege(pageChange = 1, query, rowsPage) {
  const [sort, setSort] = useState({
    sortKey: "createdAt",
    sortOrder: "asc",
  });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      let url = `/api/permission?pageNo=${pageChange - 1}&sortKey=${
        sort.sortKey
      }&sortOrder=${sort.sortOrder}&pageSize=${rowsPage}`;
      if (query) {
        url += `&searchString=${query}`;
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
  }, [pageChange, query, sort, rowsPage]);

  return { data, loading, fetchData, setLoading, sort, setSort };
}

export default useGetPrivilege;
