import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";

import apiUrls from "../../../utils/apiUrls";
import errorHandler from "../../../utils/errorHandler";
import toastifyUtils from "../../../utils/toastify";

function useUpdateHealthConfig() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function UpdateDataFun(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.put(
        `/${apiUrls.healthConfig}`,
        data
      );
      toastifyUtils.notifySuccess(
        response?.data?.message || "Health Config updated successfully"
      );
      navigate("/health-config");
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  }
  return { UpdateDataFun, updateLoading: loading };
}

export default useUpdateHealthConfig;
