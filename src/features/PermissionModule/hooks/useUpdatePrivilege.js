import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance"; 
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { hideDialog } from "../../../stores/slices/dialogSlice";
import apiUrls from "../../../utils/apiUrls";

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
      toast.success(
        response?.data?.message || "Permission updated successfully"
      );
      dispatch(hideDialog());
      fetchData();
    } catch (error) {
      console.error("Error", error);
    } finally {
      setLoading(false);
    }
  }
  return { updateData, loading };
}

export default useUpdatePrivilege;
