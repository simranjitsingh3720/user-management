import { useState } from "react";
import axiosInstance from "../../../core/axiosInstance";

function useGetDataById() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (EODId) => {
    try {
      let url = `/api/producer-eod-bypass/${EODId}`;

      const response = await axiosInstance.get(url);
      setData(response.data);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, fetchData, setLoading };
}

export default useGetDataById;
