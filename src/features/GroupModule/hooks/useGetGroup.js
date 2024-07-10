import axiosInstance from "../../../utils/axiosInstance"; 

import { useEffect, useState } from "react";

function useGetGroup(pageChange = 1, rowsPage) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState({
    sortKey: "createdAt",
    sortOrder: "asc",
  });

  const fetchData = async (key, query, resultPermissionString) => {
    try {
      setLoading(true);
      let url = `/api/group?pageNo=${pageChange - 1}&sortKey=${
        sort.sortKey
      }&sortOrder=${sort.sortOrder}&pageSize=${rowsPage}`;
      if (key === "groupName" && query) {
        url += `&searchKey=${key}&searchString=${query}`;
      } else if (key === "permissionName" && resultPermissionString) {
        url += `&ids=${resultPermissionString}&isExclusive=${true}&edge=hasPermission`;
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

export default useGetGroup;
