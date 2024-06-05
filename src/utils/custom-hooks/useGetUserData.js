import { useEffect, useState, useCallback } from "react";
import axiosInstance from "./../../core/axiosInstance";
import { API_END_POINTS } from "../constants";
import { toast } from "react-toastify";

function useGetUserData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_END_POINTS.USERAPI + 'Producer');
      setData(response?.data?.data || []);
    } catch (error) {
      toast.error(error.response?.data?.error?.message || "Failed to fetch user data");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    userData: data,
    userLoading: loading,
    userFetchData: fetchData,
  };
}

export default useGetUserData;
