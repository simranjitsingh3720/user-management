import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import errorHandler from "../../../utils/errorHandler";
import toastifyUtils from "../../../utils/toastify";


function useCreateBancaField() {
  const [loading, setLoading] = useState(false);

  async function postData(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/banca", data);
      toastifyUtils.notifySuccess(
        response?.data?.message || "Banca Field created successfully"
      );
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false); 
    }
  }
  return { postData, loading };
}

export default useCreateBancaField;
