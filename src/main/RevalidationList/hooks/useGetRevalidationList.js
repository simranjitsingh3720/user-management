import { useState, useCallback } from "react";
import axiosInstance from "./../../../core/axiosInstance";
import { API_END_POINTS } from "../constants";


const useGetRevalidationList = () => {
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
      console.error("Failed to fetch revalidation list:", error);
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

export default useGetRevalidationList;
