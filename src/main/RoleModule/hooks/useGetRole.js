import axiosInstance from "../../../core/axiosInstance"; // Import the instance

import { useEffect, useState } from "react";

function useGetRole(pageChange = 1) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (key, value) => {
    try {
      let url = `/api/role?pageNo=${pageChange - 1}`;
      if (key && value) {
        url += `&${key}=${value}`;
      }
      const response = await axiosInstance.get(url);
      console.log("response", response);
      setData(response.data);
    } catch (error) {
      console.log(error);
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

export default useGetRole;
