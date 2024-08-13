import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance"; 
import { useDispatch } from "react-redux";
import { hideDialog } from "../../../stores/slices/dialogSlice";
import apiUrls from "../../../utils/apiUrls";
import errorHandler from "../../../utils/errorHandler";
import toastifyUtils from "../../../utils/toastify";

function useUpdatePrivilege(fetchData) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  async function updateData(id, privilegeStatus) {
    setLoading(true);
    const payload = {
      id: id,
      properties: {
        status: privilegeStatus,
      },
    };
    try {
      const response = await axiosInstance.put(
        `${apiUrls.getPermission}`,
        payload
      );
      toastifyUtils.notifySuccess(
        response?.data?.message || "Permission updated successfully"
      );
      dispatch(hideDialog());
      fetchData();
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  }
  return { updateData, loading };
}

export default useUpdatePrivilege;
