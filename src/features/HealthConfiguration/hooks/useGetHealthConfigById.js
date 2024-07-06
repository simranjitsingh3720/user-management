import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import apiUrls from "../../../utils/apiUrls";

function useGetHealthConfigByID() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (healthConfigId) => {
    try {
      let url = `/${apiUrls.healthConfig}/${healthConfigId}`;

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
