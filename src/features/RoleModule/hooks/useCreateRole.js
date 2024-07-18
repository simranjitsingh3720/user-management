import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance"; 
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import errorHandler from "../../../utils/errorHandler";


function useCreateRole() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function postData(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/role", data);
      toast.success(response?.data?.message || "Role created successfully");
      navigate("/roles");
    } catch (error) {
     errorHandler.handleError(error);

      
    } finally {
      setLoading(false); 
    }
  }
  return { postData, loading };
}

export default useCreateRole;
