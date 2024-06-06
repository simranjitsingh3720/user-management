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
      const transformedData =
        response?.data?.data.map((item) => ({
          ...item,
          active: item.status,
        })) || [];
      setData(transformedData);
    } catch (error) {
      toast.error(error.response?.data?.error?.message || "Failed to fetch revalidation list");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateData = useCallback((updatedData) => {
    const transformedData = updatedData.map((item) => ({
      ...item,
      status: item.active,
    }));
    setData(transformedData);
    
    // Create payload with only the updated items
    const payload = transformedData
      .map((item) => ({
        id: item.id,
        properties: {
          status: item.active,
        },
      }));

    if (payload.length > 0) {
      axiosInstance
        .put(API_END_POINTS.updateRevalidationList, payload)
        .then((response) => {
          toast.success("Data updated successfully");
        })
        .catch((error) => {
          toast.error(error.response?.data?.error?.message || "Failed to update data");
        });
    } else {
      toast.error("Something went Worng")
    }
  }, []);

  return {
    revalidationList: data,
    revalidationListLoading: loading,
    revalidationListFetchData: fetchData,
    revalidationListUpdateData: updateData,
  };
};

export default useRevalidationList;
