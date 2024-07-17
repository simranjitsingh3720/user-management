import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";


function useCreateHouseBank() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function postData(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/house-bank", data);
      toast.success(
        response?.data?.message ||
          "Product Wise Payment Configuration Created successfully"
      );
      navigate("/house-bank-master");
    } catch (error) {
     console.error("Error", error);
    } finally {
      setLoading(false); 
    }
  }
  return { postData, loading };
}

export default useCreateHouseBank;
