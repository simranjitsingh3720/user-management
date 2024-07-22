import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance"; 
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import errorHandler from "../../../utils/errorHandler";


function useCreateGroup() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function postData(data, groupUser) {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/group", data);

      const addUsers = groupUser.map((item) => item.id);

      const payload = {
        addUsers,
        removeUsers: [],
        id: response?.data?.data[0]?.id,
      };
      if (addUsers && addUsers.length) {
        await axiosInstance.put("api/group/update-users", payload);
      }

      toast.success(response?.data?.message || "Group created successfully");
      navigate("/group");
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false); 
    }
  }
  return { postData, loading };
}

export default useCreateGroup;
