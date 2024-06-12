import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

function useGetEmployeeByProducer() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (producerId) => {
    console.log("employee Producer");
    try {
      let url = `/api/employee-flag-config?producers=${producerId}`;

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

export default useGetEmployeeByProducer;
