import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_END_POINTS } from "../utils/constants";

function useGetAllProduct() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      let url = `${API_END_POINTS.PRODUCTAPI}?isAll=${true}`;
      const response = await axiosInstance.get(url);
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

  return { data, loading, fetchData };
}

export default useGetAllProduct;
