import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { COMMON_ERROR } from "../../../utils/globalConstants";

function useUpdateProposal(setChangeStatusOpen, fetchGroupList) {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function UpdateDataFun(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.put(
        "/api/proposal-otp-exception",
        data
      );
      toast.success(response?.data?.message || "Proposal updated successfully");
      navigate("/proposalOtpException");
      if (setChangeStatusOpen) setChangeStatusOpen(false);
      if (fetchGroupList) fetchGroupList();
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

export default useUpdateProposal;
