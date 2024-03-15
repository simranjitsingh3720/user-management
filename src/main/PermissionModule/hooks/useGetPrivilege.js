import axiosInstance from "../../../core/axiosInstance"; // Import the instance

import { useEffect, useState } from "react";

function useGetPrivilege(pageChange = 1) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ open: false, error: "" });

  const fetchData = async (key, value) => {
    try {
      let url = `/api/permission?pageNo=${pageChange - 1}`;
      if (key && value) {
        url += `&${key}=${value}`;
      }
      const response = await axiosInstance.get(url);
      console.log("response", response);
      setData(response.data);
    } catch (error) {
      console.log(error);
      setToast({
        open: true,
        error:
          error?.response?.data?.error?.message ||
          "An error occurred. Please try again.",
      });
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [pageChange]);

  return { data, loading, fetchData, setLoading, toast, setToast };
}

export default useGetPrivilege;
