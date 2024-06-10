import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

function useGetProducerData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (id) => {
    try {
      setLoading(true);
      let url = `/api/user/${id}/products`;

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

export default useGetProducerData;
