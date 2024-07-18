import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import errorHandler from "../../../utils/errorHandler";


function useCreateOTPException({ fetchData }) {
  const [loading, setLoading] = useState(false);

  async function postData(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/otp-exception", data);
      toast.success(
        response?.data?.message || "OTP Exception created successfully"
      );
      fetchData();
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false); 
    }
  }
  return { postData, loading };
}

export default useCreateOTPException;
