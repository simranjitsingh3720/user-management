import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";
import { COMMON_ERROR } from "../../../utils/globalConstants";

function useUpdateEODBypass() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function UpdateDataFun(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.put(
        "/api/producer-eod-bypass",
        data
      );
      toast.success(
        response?.data?.message || "EOD Producer updated successfully"
      );
      navigate("/producer-eod-bypass-list");
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message || COMMON_ERROR
      );

      
    } finally {
      setLoading(false); 
    }
  }
  return { UpdateDataFun, updateLoading: loading };
}

export default useUpdateEODBypass;
