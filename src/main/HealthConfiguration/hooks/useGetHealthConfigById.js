import { useState } from "react";
import axiosInstance from "../../../core/axiosInstance";

function useGetHealthConfigByID() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (healthConfigId) => {
    try {
      let url = `/api/health-configuration/${healthConfigId}`;

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

export default useGetHealthConfigByID;
