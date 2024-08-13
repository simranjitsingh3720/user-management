import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import apiUrls from "../../../utils/apiUrls";
import errorHandler from "../../../utils/errorHandler";
import toastifyUtils from "../../../utils/toastify";

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
      toastifyUtils.notifySuccess(
        response?.data?.message || "Product Payment updated successfully"
      );
      navigate("/product-payment-config");
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  }
  return { UpdateDataFun, updateLoading: loading };
}

export default useUpdatePaymentConfig;
