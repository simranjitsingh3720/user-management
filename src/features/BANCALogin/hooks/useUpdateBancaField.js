import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import { COMMON_ERROR } from "../../../utils/globalConstants";

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
        error?.response?.data?.error?.message || COMMON_ERROR
      );
      
    } finally {
      setLoading(false); 
    }
  }
  return { updateData, loading };
}

export default useUpdateBancaField;
