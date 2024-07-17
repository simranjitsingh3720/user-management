import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";


function useUpdateOTPException(setChangeStatusOpen, fetchGroupList) {
  const [loading, setLoading] = useState(false);

  async function UpdateDataFun(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.put("/api/otp-exception", data);
      toast.success(response?.data?.message || "Proposal updated successfully");
      setChangeStatusOpen(false);
      fetchGroupList();
    } catch (error) {
     console.error("Error", error);
      
    } finally {
      setLoading(false); 
    }
  }
  return { UpdateDataFun, updateLoading: loading };
}

export default useUpdateOTPException;
