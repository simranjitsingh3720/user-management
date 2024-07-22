import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance"; 
import errorHandler from "../../../utils/errorHandler";


function useUpdateUser() {
  const [loading, setLoading] = useState(false);

  async function postData(payload) {
    setLoading(true);
    try {
      await axiosInstance.put("api/group/update-users", payload);
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false); 
    }
  }
  return { userPostData: postData, userLoading: loading };
}

export default useUpdateUser;
