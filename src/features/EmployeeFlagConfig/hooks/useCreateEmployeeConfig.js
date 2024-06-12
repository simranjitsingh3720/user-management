import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";

function useCreateEmployeeConfig(listFetchFun) {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function postData(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/api/employee-flag-config",
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
      toast.error(
        error?.response?.data?.error?.message ||
          "An error occurred. Please try again."
      );
    } finally {
      setLoading(false); // Set loading to false when request finishes (whether success or failure)
    }
  }
  return { postData, loading };
}

export default useCreateEmployeeConfig;
