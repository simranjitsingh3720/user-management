import axiosInstance from "../../../utils/axiosInstance"; // Import the instance

import { useState } from "react";

function useGetGroupById() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (groupId) => {
    try {
      let url = `/api/group/${groupId}`;

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

export default useGetGroupById;
