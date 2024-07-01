import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import { COMMON_ERROR } from "../../../utils/globalConstants";

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
      toast.error(
        error?.response?.data?.error?.message || COMMON_ERROR
      );
      // Handle errors
    } finally {
      setLoading(false); // Set loading to false when request finishes (whether success or failure)
    }
  }
  return { UpdateDataFun, updateLoading: loading };
}

export default useUpdateOTPException;
