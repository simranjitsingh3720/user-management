import { useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_END_POINTS } from '../constant';

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
      const { data: responseData } = await axios.post(API_END_POINTS.POST_API, body);
      toast.success(responseData?.message || "Partner NEFT created successfully");
      navigate("/partner-neft");
    } catch (e) {
      toast.error(e?.response?.data?.error?.message || "An error occurred. Please try again.");
    }
  }, [navigate]);

  return { createPartnerNeft };
};

export default useSubmit;
