import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import { COMMON_ERROR } from "../../../utils/globalConstants";
import apiUrls from "../../../utils/apiUrls";

function useUpdateEmployeeConfig(listFetchFun) {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function UpdateDataFun(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.put(
        `/${apiUrls.employeeFlag}`,
        data
      );
      toast.success(
        response?.data?.message || "Employee Config updated successfully"
      );
      navigate("/employee-flag-config");
      if (listFetchFun) {
        listFetchFun();
      }
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || COMMON_ERROR);
    } finally {
      setLoading(false);
    }
  }
  return { UpdateDataFun, updateLoading: loading };
}

export default useUpdateEmployeeConfig;
