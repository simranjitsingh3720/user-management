import axiosInstance from "../../../utils/axiosInstance"; // Import the instance

import { useEffect, useState } from "react";

function useGetRole(pageChange = 1, rowsPage) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState({
    sortKey: "createdAt",
    sortOrder: "asc",
  });

  const fetchData = async (key, query, resultGroupId) => {
    try {
      setLoading(true);
      let url = `/api/role?pageNo=${pageChange - 1}&sortKey=${
        sort.sortKey
      }&sortOrder=${sort.sortOrder}&pageSize=${rowsPage}`;
      if (key === "roleName" && query) {
        url += `&searchKey=${key}&searchString=${query}`;
      } else if (key === "groupName" && resultGroupId) {
        url += `&searchKey=${key}&groupName=${resultGroupId}`;
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

  return { data, loading, fetchData, setLoading, setSort, sort };
}

export default useGetRole;
