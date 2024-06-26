import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_END_POINTS } from "../utils/constant";
import axiosInstance from "./../../../utils/axiosInstance";
import { COMMON_ERROR } from "../../../utils/globalConstants";

const useSubmit = () => {
  const navigate = useNavigate();

  const createPartnerNeft = useCallback(
    async (data) => {
      const { lob, product, producer, verificationMethod } = data;

      const body = {
        lobId: lob.id,
        productId: product.id,
        producerId: producer.id,
        verificationMethod: verificationMethod.value,
        status: true,
      };

      try {
        const { data: responseData } = await axiosInstance.post(
          API_END_POINTS.POST_API,
          body
        );
        toast.success(
          responseData?.message || "Partner NEFT created successfully"
        );
        navigate("/partner-neft");
      } catch (e) {
        toast.error(
          e?.response?.data?.error?.message || COMMON_ERROR
        );
      }
    },
    [navigate]
  );

  const getPartnerNeft = useCallback(async (id) => {
    try {
      const { data: responseData } = await axiosInstance.get(
        `${API_END_POINTS.GET_API}/${id}`
      );
      return responseData.data;
    } catch (e) {
      toast.error(
        e?.response?.data?.error?.message || COMMON_ERROR
      );
      return null;
    }
  }, []);

  const updatePartnerNeft = useCallback(
    async (id, data) => {
      const { producer, verificationMethod } = data;

      const body = {
        id: id,
        properties: {
          producerId: producer.id,
          verificationMethod: verificationMethod.value,
        }
      };

      try {
        const { data: responseData } = await axiosInstance.put(
          `${API_END_POINTS.POST_API}`,
          body
        );
        toast.success(
          responseData?.message || "Partner NEFT updated successfully"
        );
        navigate("/partner-neft");
      } catch (e) {
        toast.error(
          e?.response?.data?.error?.message || COMMON_ERROR
        );
      }
    },
    [navigate]
  );

  return { createPartnerNeft, getPartnerNeft, updatePartnerNeft };
};

export default useSubmit;
