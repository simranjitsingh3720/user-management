import apiUrls from "../../../../utils/apiUrls";
import axiosInstance from "../../../../utils/axiosInstance"; 
import { useState } from "react";

export default function useGetUserById() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (userId) => {
    try {
      let url = `${apiUrls.getUser}/${userId}`;
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
