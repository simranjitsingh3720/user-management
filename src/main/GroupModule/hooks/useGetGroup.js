import axiosInstance from "../../../core/axiosInstance"; // Import the instance

import { useEffect, useState } from "react";

function useGetGroup(pageChange = 1) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (key, query, resultPermissionString) => {
    try {
      let url = `/api/group?pageNo=${pageChange - 1}`;
      if (key === "groupName") {
        url += `&searchKey=${key}&searchString=${query}`;
      } else if (key === "permissionName") {
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
  }, [pageChange]);

  return { data, loading, fetchData, setLoading };
}

export default useGetGroup;
