import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import {
  COMMON_ERROR,
  TOKEN,
} from "../../../utils/globalConstants";
import apiUrls from "../../../utils/apiUrls";
import { DASHBOARD } from "../utils/constants";

export default function usePostLogin() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function postData(loginData) {
    setLoading(true);
    try {
      const response = await axiosInstance.post(apiUrls.postLogin, loginData);
      const { data }  = response.data;
      if (data) {
        localStorage.setItem(TOKEN, data.token);
        localStorage.setItem("scopes", JSON.stringify(data.scopes));
        navigate(DASHBOARD);
      }
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || COMMON_ERROR);
    } finally {
      setLoading(false);
    }
  }
  return { postData, loading };
}
