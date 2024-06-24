import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_END_POINTS, VERFICATION_ENUM } from "../utils/constant";
import axiosInstance from "./../../../utils/axiosInstance";

const useGetPartnerNeft = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get Partner Neft Data
  const getPartnerNeft = useCallback(async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_END_POINTS.GET_API}?isAll=true`
      );
      const partnerNeftData = response.data.data.map((item) => ({
        lob: item.lob.lob,
        product: item.product.product,
        producerName: item.producer.firstName,
        producerCode: item.producer.producerCode,
        verificationMethod: VERFICATION_ENUM[item.verificationMethod],
      }));
      setData(partnerNeftData);
    } catch (e) {
      toast.error(
        e?.response?.data?.error?.message ||
          "An error occurred. Please try again."
      );
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPartnerNeft();
  }, [getPartnerNeft]);

  return {
    getPartnerNeft: getPartnerNeft,
    partnerNeftData: data,
    partnerNeftLoading: loading,
  };
};

export default useGetPartnerNeft;
