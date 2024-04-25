import axiosInstance from "../../../../core/axiosInstance"; // Import the instance

import { useEffect, useState } from "react";

function useGetRole() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      let url = `/api/role?isAll=${true}`;
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
    roleData: data,
    roleLoading: loading,
    roleFetchData: fetchData,
    roleSetLoading: setLoading,
  };
}

export default useGetRole;
