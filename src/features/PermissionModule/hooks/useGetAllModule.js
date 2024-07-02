import axiosInstance from "../../../utils/axiosInstance"; 

import { useEffect, useState } from "react";

function useGetAllModule() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (key, value) => {
    try {
      const response = await axiosInstance.get(`api/module/all?status=${true}`);
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
