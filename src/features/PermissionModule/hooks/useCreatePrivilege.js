import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import apiUrls from "../../../utils/apiUrls";
import errorHandler from "../../../utils/errorHandler";
import toastifyUtils from "../../../utils/toastify";

function useCreatePrivilege() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function postData(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `${apiUrls.getPermission}`,
        data
      );
      toastifyUtils.notifySuccess(
        response?.data?.message || "Permission created successfully"
      );
      navigate("/permission");
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  }
  return { postData, loading };
}

export default useCreatePrivilege;
