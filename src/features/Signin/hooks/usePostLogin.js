import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import {
  COMMON_ERROR,
  TOKEN,
  TOKEN_EXPIRATION,
} from "../../../utils/globalConstants";
import { expirationTime } from "../../../utils/auth";
import apiUrls from "../../../utils/apiUrls";
import { DASHBOARD } from "../utils/constants";

export default function usePostLogin() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function postData(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.post(apiUrls.postLogin, data);
      if (response.data) {
        localStorage.setItem(TOKEN, response?.data?.data?.token);
        localStorage.setItem(TOKEN_EXPIRATION, expirationTime());
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
