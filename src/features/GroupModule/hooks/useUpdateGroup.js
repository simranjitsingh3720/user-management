import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance"; 
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function useUpdateGroup(setChangeStatusOpen, fetchGroupList) {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function UpdateDataFun(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.put("/api/group", data);
      toast.success(response?.data?.message || "Group updated successfully");
      navigate("/group");
      if (setChangeStatusOpen) setChangeStatusOpen(false);
      if (fetchGroupList) fetchGroupList();
    } catch (error) {
      console.error("Error updating Group", error);
    } finally {
      setLoading(false); 
    }
  }
  return { UpdateDataFun, updateLoading: loading };
}

export default useUpdateGroup;
