import { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../../../core/axiosInstance";

export default function useUpdateUser(setOpen, fetchData) {
  const [loading, setLoading] = useState(false);

  async function updateData(id, data, userStatus) {
    setLoading(true);

    let payload;
    if (userStatus) {
      payload = {
        id: id,
        fields: {
          status: data.status,
        },
      };
    } else {
      payload = {
        id: id,
        roleId: data.roleSelect.id,
        groupId: data.groupSelect.id,
        fields: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.emailId,
          mobileNo: data.mobileNumber,
          userId: data.userId,
          ntId: data.ntLogin,
          producerCode: data.producerCode,
          roleName: data.roleSelect.roleName,
          password: "asd",
          status: data.status,
        },
      };
    }
    try {
      const response = await axiosInstance.put("/api/user", payload);
      toast.success(
        response?.data?.message || "Permission updated successfully"
      );
      if (setOpen) setOpen(false);
      if (fetchData) fetchData();
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message ||
          "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }
  return { updateData, updateUserLoading: loading };
}
