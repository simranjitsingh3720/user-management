import axiosInstance from "../../../utils/axiosInstance"; 

import { useEffect, useState } from "react";

function useGetPermission() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      let url = `/api/permission?isAll=${true}`;

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
  }, []);

  return {
    permissionData: data,
    permissionLoading: loading,
    permissionFetchDatat: fetchData,
  };
}

export default useGetPermission;
