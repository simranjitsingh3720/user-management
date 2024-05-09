import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../core/axiosInstance";
import { toast } from "react-toastify";

function useCreateProduct() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function postData(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/product", data);
      toast.success(response?.data?.message || "Product created successfully");
      navigate("/product");
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message ||
          "An error occurred. Please try again."
      );
    } finally {
      setLoading(false); // Set loading to false when request finishes (whether success or failure)
    }
  }
  return { postData, loading };
}

export default useCreateProduct;
