import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { API_END_POINTS, VERFICATION_ENUM } from "../utils/constant";
import axiosInstance from "./../../../utils/axiosInstance";

const useGetPartnerNeft = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const buildQueryString = (params) => {
    return Object.keys(params)
      .filter((key) => params[key] != null && params[key] !== "" && params[key] !== undefined) 
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join("&");
  };

  const getPartnerNeft = useCallback(
    async ({
      isAll,
      status,
      searchString,
      sortKey,
      sortOrder,
      searchKey,
      pageNo,
      pageSize,
    } = {}) => {
      setLoading(true);
      try {
        const queryParams = buildQueryString({
          isAll,
          status,
          searchString,
          sortKey,
          sortOrder,
          searchKey,
          pageNo,
          pageSize,
        });

        const response = await axiosInstance.get(
          `${API_END_POINTS.GET_API}?${queryParams}`
        );
        const partnerNeftData = response.data.data.map((item) => ({
          id: item.id,
          lob: item.lob.lob,
          product: item.product.product,
          producerName: item.producer.firstName,
          producerCode: item.producer.producerCode,
          verificationMethod: VERFICATION_ENUM[item.verificationMethod],
        }));
        setData(partnerNeftData);
        setTotalCount(response.data.totalCount);
      } catch (e) {
        toast.error(
          e?.response?.data?.error?.message ||
            "An error occurred. Please try again."
        );
        setData([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    getPartnerNeft,
    partnerNeftData: data,
    partnerNeftLoading: loading,
    totalCount,
  };
};

export default useGetPartnerNeft;
