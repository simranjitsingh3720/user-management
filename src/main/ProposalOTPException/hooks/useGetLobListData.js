import { useState } from "react";
import axiosInstance from "../../../core/axiosInstance";

function useGetLobListData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (id) => {
    try {
      setLoading(true);
      let url = `/api/product/${id}/lob`;

      const response = await axiosInstance.get(url);
      setData(response.data);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return { producerList: data, fetchData, loading };
}

export default useGetLobListData;
