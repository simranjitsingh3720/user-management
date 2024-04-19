import { useState } from "react";
import axiosInstance from "../../../core/axiosInstance"; // Import the instance
import { toast } from "react-toastify";

function useUpdateUser() {
  const [loading, setLoading] = useState(false);

  async function postData(payload) {
    setLoading(true);
    try {
      await axiosInstance.put("api/group/update-users", payload);
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
  return { userPostData: postData, userLoading: loading };
}

export default useUpdateUser;
