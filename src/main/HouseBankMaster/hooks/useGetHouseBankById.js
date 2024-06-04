import { useState } from "react";
import axiosInstance from "../../../core/axiosInstance";

function useGetHouseBankByID() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (houseBankId) => {
    try {
      let url = `/api/house-bank/${houseBankId}`;

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

export default useGetHouseBankByID;
