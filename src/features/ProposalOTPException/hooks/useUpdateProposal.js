import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import errorHandler from "../../../utils/errorHandler";
import apiUrls from "../../../utils/apiUrls";
import toastifyUtils from "../../../utils/toastify";


function useUpdateProposal() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function updateProposalData(payload, data, updateStatus) {
    setLoading(true);
    try {
      const response = await axiosInstance.put(
        apiUrls.proposalOtpException,
        payload
      );

      toastifyUtils.notifySuccess(response?.data?.message || "Proposal updated successfully");
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
  return { updateProposalData, updateLoading: loading };
}

export default useUpdateProposal;
