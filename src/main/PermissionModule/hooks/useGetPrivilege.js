import axiosInstance from "../../../core/axiosInstance"; // Import the instance

import { useEffect, useState } from "react";

function useGetPrivilege(pageChange = 1, query) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      let url = `/api/permission?pageNo=${pageChange - 1}`;
      if (query) {
        url += `&${"searchString"}=${query}`;
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
  }, [pageChange, query]);

  return { data, loading, fetchData, setLoading };
}

export default useGetPrivilege;
