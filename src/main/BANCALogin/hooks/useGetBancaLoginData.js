import { useState } from "react";
import axiosInstance from "../../../core/axiosInstance";

function useGetBancaLoginData(pageChange) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (producerId, productId) => {
    try {
      let url = `/api/banca/producer/product?producerId=${producerId}&productId=${productId}`;
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

export default useGetBancaLoginData;
