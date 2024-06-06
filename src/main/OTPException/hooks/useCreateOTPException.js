import { useState } from "react";
import axiosInstance from "../../../core/axiosInstance";
import { toast } from "react-toastify";

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
      toast.error(
        error?.response?.data?.error?.message ||
          "An error occurred. Please try again."
      );
      // Handle errors
    } finally {
      setLoading(false); // Set loading to false when request finishes (whether success or failure)
    }
  }
  return { postData, loading };
}

export default useCreateOTPException;
