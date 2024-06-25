import { useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance"; // Import the instance

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
      navigate("/user-management");
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message ||
          "An error occurred. Please try again."
      );

      // Handle errors
    } finally {
      setLoading(false); // Set loading to false when request finishes (whether success or failure)
    }
  }
  return { postData, loading };
}
