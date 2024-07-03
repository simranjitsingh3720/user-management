import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { COMMON_ERROR } from "../../../utils/globalConstants";
import { API_END_POINTS } from "../../../utils/constants";

function useCreatePrivilege() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function postData(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `${API_END_POINTS.PERMISSION}`,
        data
      );
      toast.success(
        response?.data?.message || "Permission created successfully"
      );
      navigate("/permission");
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || COMMON_ERROR);
    } finally {
      setLoading(false);
    }
  }
  return { postData, loading };
}

export default useCreatePrivilege;
