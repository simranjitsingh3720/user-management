import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import errorHandler from "../../../utils/errorHandler";
import apiUrls from "../../../utils/apiUrls";


function useCreateProduct() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function postData(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.post(apiUrls.getProduct, data);
      toast.success(response?.data?.message || "Product created successfully");
      navigate("/product");
    } catch (error) {
     errorHandler.handleError(error); 
    } finally {
      setLoading(false); 
    }
  }
  return { postData, loading };
}

export default useCreateProduct;
