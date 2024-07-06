import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { API_END_POINTS } from "../../../utils/constants";

function useGetPaymentConfigByID() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (paymentId) => {
    try {
      let url = `/${API_END_POINTS.PRODUCTPAYMENT}/${paymentId}`;

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

export default useGetPaymentConfigByID;
