import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import apiUrls from "../../../utils/apiUrls";

function useGetPayment() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (lobId) => {
    try {
      setLoading(true);
      let url = `${apiUrls.getPaymentType}?isAll=${true}`;
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
