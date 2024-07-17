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
      console.error("Error updating Banca Field", error);
    } finally {
      setLoading(false); 
    }
  }
  return { updateData, loading };
}

export default useUpdateBancaField;
