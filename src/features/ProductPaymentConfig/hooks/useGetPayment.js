import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

function useGetPayment() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (lobId) => {
    try {
      setLoading(true);
      let url = `/api/payment-type?isAll=${true}`;
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

export default useGetPayment;
