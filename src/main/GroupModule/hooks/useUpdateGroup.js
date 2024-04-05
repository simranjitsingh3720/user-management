import { useState } from "react";
import axiosInstance from "../../../core/axiosInstance"; // Import the instance
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

export default useUpdateGroup;
