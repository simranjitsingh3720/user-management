import axiosInstance from "../../../utils/axiosInstance"; 

import { useState } from "react";

function useGetSubModule() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (id) => {
    try {
      setLoading(true);
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
