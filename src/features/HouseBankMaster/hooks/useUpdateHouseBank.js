import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import { COMMON_ERROR } from "../../../utils/globalConstants";

function useUpdateHouseBank(setChangeStatusOpen, fetchGroupList) {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function UpdateDataFun(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.put("/api/house-bank", data);
      toast.success(
        response?.data?.message || "House Bank updated successfully"
      );
      if (setChangeStatusOpen) {
        setChangeStatusOpen();
      }
      if (fetchGroupList) {
        fetchGroupList();
      }
      navigate("/house-bank-master");
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

export default useUpdateHouseBank;
