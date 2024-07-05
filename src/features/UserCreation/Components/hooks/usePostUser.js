import { useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance"; 
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function usePostUser() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function postData(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/user", data);
      toast.success(response?.data?.message || "User created successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.error?.message || error?.response?.data?.details ||
          "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }
  return { postData, loading };
}
