import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance"; // Import the instance
import { toast } from "react-toastify";

function useUpdatePrivilege(setOpen, fetchData) {
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
      const response = await axiosInstance.put("/api/permission", payload);
      toast.success(
        response?.data?.message || "Permission updated successfully"
      );
      setOpen(false);
      fetchData();
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message ||
          "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }
  return { updateData, loading };
}

export default useUpdatePrivilege;
