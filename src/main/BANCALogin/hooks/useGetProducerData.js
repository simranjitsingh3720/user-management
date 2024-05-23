import { useEffect, useState } from "react";
import axiosInstance from "../../../core/axiosInstance";

function useGetProducerData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      let url = `/api/product?isAll=${true}`;

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

  return { producerList: data };
}

export default useGetProducerData;
