import axiosInstance from "../../../core/axiosInstance"; // Import the instance

import { useState } from "react";

function useGetSubModule() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (id) => {
    try {
      const response = await axiosInstance.get(`api/module/submodule?id=${id}`);
      setData(response.data);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    SubModuleData: data,
    SubModuleLoading: loading,
    SubModuleFetchData: fetchData,
    setSubModuleLoading: setLoading,
  };
}

export default useGetSubModule;
