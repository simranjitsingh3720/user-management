import axiosInstance from "../../../core/axiosInstance"; // Import the instance

import { useState } from "react";

function useGetRoleById() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (roleId) => {
    try {
      let url = `/api/role/${roleId}`;

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

export default useGetRoleById;
