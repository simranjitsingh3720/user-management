import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "./../../../../utils/axiosInstance";
import { COMMON_ERROR } from "./../../../../utils/globalConstants";

const useSubmit = () => {
  const navigate = useNavigate();

  const getUserById = useCallback(async (id) => {
    try {
      let url = `/api/user/${id}`;  
      const { data: responseData } = await axiosInstance.get(
        url
      );
      return responseData.data;
    } catch (e) {
      toast.error(
        e?.response?.data?.error?.message || COMMON_ERROR
      );
      return null;
    }
  }, []);

  

  return { getUserById };
};

export default useSubmit;
