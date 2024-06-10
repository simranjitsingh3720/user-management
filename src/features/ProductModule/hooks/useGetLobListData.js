import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

function useGetLobListData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      let url = `/api/lob?isAll=${true}&status=${true}`;
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

  return { data, loading };
}

export default useGetLobListData;
