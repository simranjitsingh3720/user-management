import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import { COMMON_ERROR } from "../../../utils/globalConstants";

function useUpdateBitlyLink(setChangeStatusOpen, fetchGroupList) {
  const [loading, setLoading] = useState(false);

  async function UpdateDataFun(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.put(
        "/api/proposal-bitly-config",
        data
      );
      toast.success(
        response?.data?.message || "Proposal bitly config successfully"
      );
      setChangeStatusOpen(false);
      fetchGroupList();
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

export default useUpdateBitlyLink;
