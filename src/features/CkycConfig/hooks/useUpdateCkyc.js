import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";

function useUpdateCkyc() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function UpdateDataFun(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.put("/api/ckyc", data);
      toast.success(
        response?.data?.message || "House Bank updated successfully"
      );
      navigate("/ckyc-config");
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message ||
          "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }
  return { UpdateDataFun, updateLoading: loading };
}

export default useUpdateCkyc;
