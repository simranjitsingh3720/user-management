import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import {
  TOKEN,
} from "../../../utils/globalConstants";
import apiUrls from "../../../utils/apiUrls";
import { DASHBOARD } from "../utils/constants";
import { COMMON_WORDS } from "../../../utils/constants";

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
        localStorage.setItem(COMMON_WORDS.SCOPES, JSON.stringify(data.scopes));
        localStorage.setItem(COMMON_WORDS.USER, JSON.stringify(data.user));
        navigate(DASHBOARD);
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      setLoading(false);
    }
  }
  return { postData, loading };
}
