import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance"; 
import { toast } from "react-toastify";
import { COMMON_ERROR } from "../../../utils/globalConstants";

function useUpdateUser() {
  const [loading, setLoading] = useState(false);

  async function postData(payload) {
    setLoading(true);
    try {
      await axiosInstance.put("api/group/update-users", payload);
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message || COMMON_ERROR
      );
      
    } finally {
      setLoading(false); 
    }
  }
  return { userPostData: postData, userLoading: loading };
}

export default useUpdateUser;
