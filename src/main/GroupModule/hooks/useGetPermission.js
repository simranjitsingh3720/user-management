import axiosInstance from "../../../core/axiosInstance"; // Import the instance

import { useEffect, useState } from "react";

function useGetPermission(inputValue) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      let url = `/api/permission`;
      if (inputValue) {
        url += `?searchString=${inputValue}`;
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
  }, [inputValue]);

  return {
    permissionData: data,
    permissionLoading: loading,
    permissionFetchDatat: fetchData,
  };
}

export default useGetPermission;
