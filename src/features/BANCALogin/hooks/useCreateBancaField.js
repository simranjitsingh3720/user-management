import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import { COMMON_ERROR } from "../../../utils/globalConstants";

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
        error?.response?.data?.details || COMMON_ERROR
      );
      
    } finally {
      setLoading(false); 
    }
  }
  return { postData, loading };
}

export default useCreateBancaField;
