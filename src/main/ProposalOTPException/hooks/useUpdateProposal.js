import { useState } from "react";
import axiosInstance from "../../../core/axiosInstance";
import { toast } from "react-toastify";

function useUpdateProposal(setChangeStatusOpen, fetchGroupList) {
  const [loading, setLoading] = useState(false);

  async function UpdateDataFun(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.put(
        "/api/proposal-otp-exception",
        data
      );
      toast.success(response?.data?.message || "Proposal updated successfully");
      setChangeStatusOpen(false);
      fetchGroupList();
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
  return { UpdateDataFun, updateLoading: loading };
}

export default useUpdateProposal;
