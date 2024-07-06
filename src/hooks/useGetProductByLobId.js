import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import apiUrls from "../utils/apiUrls";

function useGetProductByLobId() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (lobId) => {
    try {
      setLoading(true);
      let url = `${apiUrls.getProduct}?lobs=${lobId}`;
      const response = await axiosInstance.get(url);
      setData(response.data);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, fetchData };
}

export default useGetProductByLobId;
