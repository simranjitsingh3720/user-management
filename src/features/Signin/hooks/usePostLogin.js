import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import { TOKEN, TOKEN_EXPIRATION } from "../../../utils/globalConstants";
import { expirationTime } from "../../../utils/auth";

export default function usePostLogin() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function postData(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/login", data);
      localStorage.setItem(TOKEN, "test token");
      localStorage.setItem(TOKEN_EXPIRATION, expirationTime());
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message ||
          "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }
  return { postData, loading };
}
