import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";

function useCreateBancaField() {
  const [loading, setLoading] = useState(false);

  async function postData(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/banca", data);
      toast.success(
        response?.data?.message || "Banca Field created successfully"
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.details || "An error occurred. Please try again."
      );
      // Handle errors
    } finally {
      setLoading(false); // Set loading to false when request finishes (whether success or failure)
    }
  }
  return { postData, loading };
}

export default useCreateBancaField;
