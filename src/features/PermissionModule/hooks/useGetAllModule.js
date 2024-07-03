import axiosInstance from "../../../utils/axiosInstance"; // Import the instance

import { useEffect, useState } from "react";
import { API_END_POINTS } from "../../../utils/constants";

function useGetAllModule() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (key, value) => {
    try {
      const response = await axiosInstance.get(
        `${API_END_POINTS.MODULE}/all?status=${true}`
      );
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
    AllModuleData: data,
    AllModuleLoading: loading,
    AllModuleFetchData: fetchData,
    setAllModuleLoading: setLoading,
  };
}

export default useGetAllModule;
