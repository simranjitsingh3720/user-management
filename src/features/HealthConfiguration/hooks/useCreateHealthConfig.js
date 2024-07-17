import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";

import apiUrls from "../../../utils/apiUrls";

function useCreateHealthConfig() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function postData(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `${apiUrls.healthConfig}`,
        data
      );
      toast.success(
        response?.data?.message ||
          "Product Wise Payment Configuration Created successfully"
      );
      navigate("/health-config");
    } catch (error) {
      console.error("Error creating Product Wise Payment Configuration", error);
    } finally {
      setLoading(false);
    }
  }
  return { postData, loading };
}

export default useCreateHealthConfig;
