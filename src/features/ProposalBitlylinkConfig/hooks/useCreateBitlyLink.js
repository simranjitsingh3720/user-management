import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import errorHandler from "../../../utils/errorHandler";


function useCreateBitlyLink() {
  const [loading, setLoading] = useState(false);

  async function postData(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/api/proposal-bitly-config",
        data
      );
      toast.success(
        response?.data?.message || "Proposal Bitly created successfully"
      );
    } catch (error) {
     errorHandler.handleError(error);
    } finally {
      setLoading(false); 
    }
  }
  return { postData, loading };
}

export default useCreateBitlyLink;
