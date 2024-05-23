import { useEffect, useState } from "react";
import axiosInstance from "../../../core/axiosInstance";

function useGetBancaLoginData(pageChange) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState({
    sortKey: "createdAt",
    sortOrder: "asc",
  });

  const fetchData = async (key, query, resultPermissionString) => {
    try {
      let url = `/api/group?pageNo=${pageChange - 1}&sortKey=${
        sort.sortKey
      }&sortOrder=${sort.sortOrder}`;
      if (key === "groupName" && query) {
        url += `&searchKey=${key}&searchString=${query}`;
      } else if (key === "permissionName" && resultPermissionString) {
        url += `&searchKey=${key}&permissions=${resultPermissionString}`;
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
  }, [pageChange, sort]);

  return { data, loading, fetchData, setLoading, setSort, sort };
}

export default useGetBancaLoginData;
