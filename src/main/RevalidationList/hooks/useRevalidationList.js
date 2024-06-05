import { useState, useCallback } from "react";
import axiosInstance from "../../../core/axiosInstance";
import { API_END_POINTS } from "../constants";
import { toast } from "react-toastify";


const useRevalidationList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        API_END_POINTS.getRevalidationList + id
      );
      setData(response?.data?.data || []);
    } catch (error) {
      console.log(error)
      toast.error(error.message || "Failed to fetch revalidation list")
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    revalidationList: data,
    revalidationListLoading: loading,
    revalidationListFetchData: fetchData,
  };
};

export default useRevalidationList;
