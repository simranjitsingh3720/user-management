import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

function useGetCkycById() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (ckycId) => {
    try {
      let url = `/api/ckyc/${ckycId}`;

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

export default useGetCkycById;
