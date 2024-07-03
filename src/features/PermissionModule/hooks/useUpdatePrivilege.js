import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance"; // Import the instance
import { toast } from "react-toastify";
import { COMMON_ERROR } from "../../../utils/globalConstants";
import { useDispatch } from "react-redux";
import { hideDialog } from "../../../stores/slices/dialogSlice";
import { API_END_POINTS } from "../../../utils/constants";

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
        `${API_END_POINTS.PERMISSION}`,
        payload
      );
      toast.success(
        response?.data?.message || "Permission updated successfully"
      );
      dispatch(hideDialog());
      fetchData();
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || COMMON_ERROR);
    } finally {
      setLoading(false);
    }
  }
  return { updateData, loading };
}

export default useUpdatePrivilege;
