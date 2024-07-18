import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";

import apiUrls from "../../../utils/apiUrls";
import errorHandler from "../../../utils/errorHandler";

function useCreateEmployeeConfig(listFetchFun) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function postData(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `/${apiUrls.employeeFlag}`,
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
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  }
  return { postData, loading };
}

export default useCreateEmployeeConfig;
