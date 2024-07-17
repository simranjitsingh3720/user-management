import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";

import apiUrls from "../../../utils/apiUrls";

function useUpdatePaymentConfig() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function UpdateDataFun(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.put(
        `/${apiUrls.paymentProduct}`,
        data
      );
      toast.success(
        response?.data?.message || "Product Payment updated successfully"
      );
      navigate("/product-payment-config");
    } catch (error) {
      console.error("Error", error);
    } finally {
      setLoading(false);
    }
  }
  return { UpdateDataFun, updateLoading: loading };
}

export default useUpdatePaymentConfig;
