import axiosInstance from "../../../utils/axiosInstance"; // Import the instance

import { useState } from "react";
import { API_END_POINTS } from "../../../utils/constants";

function useGetSubModule() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (id) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `${API_END_POINTS.MODULE}/submodule?id=${id}`
      );
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
