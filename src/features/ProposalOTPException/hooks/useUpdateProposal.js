import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import errorHandler from "../../../utils/errorHandler";


function useUpdateProposal() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function UpdateDataFun(payload, data, updateStatus) {
    setLoading(true);
    try {
      const response = await axiosInstance.put(
        "/api/proposal-otp-exception",
        payload
      );

      toast.success(response?.data?.message || "Proposal updated successfully");
      if(updateStatus) {
        updateStatus(payload.id, data);
      } else {
        navigate("/proposalotpexception");
      }
      
    } catch (error) {
     errorHandler.handleError(error);
      
    } finally {
      setLoading(false); 
    }
  }
  return { UpdateDataFun, updateLoading: loading };
}

export default useUpdateProposal;
