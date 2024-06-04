import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../core/axiosInstance";
import { toast } from "react-toastify";

function useUpdateHealthConfig() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function UpdateDataFun(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.put(
        "/api/health-configuration",
        data
      );
      toast.success(
        response?.data?.message || "Health Config updated successfully"
      );
      navigate("/health-config");
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
  return { UpdateDataFun, updateLoading: loading };
}

export default useUpdateHealthConfig;
