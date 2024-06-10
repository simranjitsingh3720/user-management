import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";

function useUpdateBancaField() {
  const [loading, setLoading] = useState(false);

  async function updateData(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.put("/api/banca", data);
      toast.success(
        response?.data?.message || "Banca Field updated successfully"
      );
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
  return { updateData, loading };
}

export default useUpdateBancaField;
