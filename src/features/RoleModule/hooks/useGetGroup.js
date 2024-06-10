import axiosInstance from "../../../utils/axiosInstance"; // Import the instance

import { useEffect, useState } from "react";

function useGetGroup() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      let url = `/api/group?isAll=${true}&status=${true}`;
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

  return { data, loading, fetchData, setLoading };
}

export default useGetGroup;
