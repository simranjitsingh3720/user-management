import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_END_POINTS } from '../utils/constant';
import axiosInstance from './../../../utils/axiosInstance'

const useSubmit = () => {
  const navigate = useNavigate();

  const createPartnerNeft = useCallback(async (data) => {
    const { lob, product, producer, verificationMethod } = data;

    const body = {
      lobId: lob.id,
      productId: product.id,
      producerId: producer.id,
      verificationMethod: verificationMethod.value,
      status: true,
    };

    try {
      const { data: responseData } = await axiosInstance.post(API_END_POINTS.POST_API, body);
      toast.success(responseData?.message || "Partner NEFT created successfully");
      navigate("/partner-neft");
    } catch (e) {
      toast.error(e?.response?.data?.error?.message || "An error occurred. Please try again.");
    }
  }, [navigate]);

  return { createPartnerNeft };
};

export default useSubmit;
