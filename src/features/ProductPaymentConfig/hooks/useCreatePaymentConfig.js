import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";

import apiUrls from "../../../utils/apiUrls";
import errorHandler from "../../../utils/errorHandler";

function useCreatePaymentConfig() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function postData(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `/${apiUrls.paymentProduct}`,
        data
      );
      toast.success(
        response?.data?.message ||
          "Product Wise Payment Configuration Created successfully"
      );
      navigate("/product-payment-config");
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  }
  return { postData, loading };
}

export default useCreatePaymentConfig;
