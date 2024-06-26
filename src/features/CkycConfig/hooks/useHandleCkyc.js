import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import { API_END_POINTS } from "../../../utils/constants";
import { COMMON_ERROR } from "../../../utils/globalConstants";

function useHandleCkyc() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function postData(data) {
    setLoading(true);
    try {
      const payload = {
        lobId: data.lob.id,
        productId: data.product.id,
        isCKYCApplicable: data.cykc === "enable" ? true : false,
      };

      if (payload.isCKYCApplicable) {
        payload.forWhom = data.forWhom;
      }
      const response = await axiosInstance.post(
        `${API_END_POINTS.CKYC}`,
        payload
      );
      toast.success(response?.data?.message || "CKYC Created successfully");
      navigate("/ckyc-config");
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || COMMON_ERROR);
    } finally {
      setLoading(false); // Set loading to false when request finishes (whether success or failure)
    }
  }

  async function UpdateData(id, data) {
    setLoading(true);
    try {
      const payload = {
        id: id,
        properties: {
          isCKYCApplicable: data.cykc === "enable" ? true : false,
        },
      };

      if (payload.properties.isCKYCApplicable) {
        payload.properties.forWhom = data.forWhom;
      }
      const response = await axiosInstance.put(
        `${API_END_POINTS.CKYC}`,
        payload
      );
      toast.success(
        response?.data?.message || "House Bank updated successfully"
      );
      navigate("/ckyc-config");
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || COMMON_ERROR);
    } finally {
      setLoading(false);
    }
  }
  return { UpdateData, postData, loading };
}

export default useHandleCkyc;
