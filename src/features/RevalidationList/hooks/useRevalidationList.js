import { useState, useCallback, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
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
      const transformedData =
        response?.data?.data.map((item) => ({
          ...item,
          checked: item.status,
        })) || [];
      setData(transformedData);
    } catch (error) {
      toast.error(
        error.response?.data?.error?.message ||
          "Failed to fetch revalidation list"
      );
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateData = useCallback(async (updatedData) => {
    const transformedData = updatedData.map((item) => ({
      ...item,
      status: item.checked,
    }));

    // Create payload with only the updated items
    const payload = transformedData.map((item) => ({
      id: item.id,
      properties: {
        status: item.checked,
      },
    }));

    try {
      await axiosInstance.put(API_END_POINTS.updateRevalidationList, payload);
      toast.success("Data updated successfully");
      setData(transformedData); // Set the updated data after successful API response
    } catch (error) {
      toast.error(
        error.response?.data?.error?.message || "Failed to update data"
      );
    }
  }, []);

  // Effect to trigger when data changes
  useEffect(() => {}, [data]);

  return {
    revalidationList: data,
    revalidationListLoading: loading,
    revalidationListFetchData: fetchData,
    revalidationListUpdateData: updateData,
  };
};

export default useRevalidationList;
