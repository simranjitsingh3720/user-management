import { useState } from "react";
import axiosInstance from "../../../core/axiosInstance"; // Import the instance
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function useCreateLob() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function postData(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/lob", data);
      toast.success(response?.data?.message || "LOB created successfully");
      navigate("/lob");
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

export default useCreateLob;
