import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance"; // Import the instance
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

export default useCreateGroup;
