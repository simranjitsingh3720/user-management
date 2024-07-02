import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import { COMMON_ERROR } from "../../../utils/globalConstants";

function useCreateProposalOTP() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function postData(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/api/proposal-otp-exception",
        data
      );
      toast.success(
        response?.data?.message || "Proposal OTP Created successfully"
      );
      navigate("/proposalOtpException");
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message || COMMON_ERROR
      );
    } finally {
      setLoading(false); 
    }
  }
  return { postData, loading };
}

export default useCreateProposalOTP;
