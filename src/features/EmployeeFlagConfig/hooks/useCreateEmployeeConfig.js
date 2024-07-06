import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import { COMMON_ERROR } from "../../../utils/globalConstants";
import { API_END_POINTS } from "../../../utils/constants";

function useCreateEmployeeConfig(listFetchFun) {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function postData(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `/${API_END_POINTS.EMPLOYEEFLAG}`,
        data
      );
      toast.success(
        response?.data?.message ||
          "Employee Flag Configuration Created successfully"
      );
      if (listFetchFun) {
        listFetchFun();
      }
      navigate("/employee-flag-config");
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || COMMON_ERROR);
    } finally {
      setLoading(false);
    }
  }
  return { postData, loading };
}

export default useCreateEmployeeConfig;
