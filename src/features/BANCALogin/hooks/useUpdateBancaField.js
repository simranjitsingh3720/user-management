import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import errorHandler from "../../../utils/errorHandler";
import toastifyUtils from "../../../utils/toastify";

function useUpdateBancaField() {
  const [loading, setLoading] = useState(false);

  async function updateData(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.put("/api/banca", data);
      toastifyUtils.notifySuccess(
        response?.data?.message || "Banca Field updated successfully"
      );
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false); 
    }
  }
  return { updateData, loading };
}

export default useUpdateBancaField;
