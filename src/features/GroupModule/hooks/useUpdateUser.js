import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance"; 


function useUpdateUser() {
  const [loading, setLoading] = useState(false);

  async function postData(payload) {
    setLoading(true);
    try {
      await axiosInstance.put("api/group/update-users", payload);
    } catch (error) {
      console.error("Error updating User", error);
    } finally {
      setLoading(false); 
    }
  }
  return { userPostData: postData, userLoading: loading };
}

export default useUpdateUser;
