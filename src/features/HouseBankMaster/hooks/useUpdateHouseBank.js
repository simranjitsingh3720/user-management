import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import errorHandler from "../../../utils/errorHandler";
import apiUrls from "../../../utils/apiUrls";
import toastifyUtils from "../../../utils/toastify";

function useUpdateHouseBank(setChangeStatusOpen, fetchGroupList) {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function UpdateDataFun(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.put(apiUrls.houseBank, data);
      toastifyUtils.notifySuccess(
        response?.data?.message || "House Bank updated successfully"
      );
      if (setChangeStatusOpen) {
        setChangeStatusOpen();
      }
      if (fetchGroupList) {
        fetchGroupList();
      }
      navigate("/house-bank-master");
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false); 
    }
  }
  return { UpdateDataFun, updateLoading: loading };
}

export default useUpdateHouseBank;
