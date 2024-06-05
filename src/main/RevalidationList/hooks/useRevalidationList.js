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
      toast.error(error.message || "Failed to fetch revalidation list");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateData = useCallback((updatedData, originalData) => {
    const transformedData = updatedData.map((item) => ({
      ...item,
      status: item.active,
    }));

    // Create payload with only the updated items
    const payload = transformedData
      .filter((item, index) => item.active !== originalData[index].active)
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
          setData(transformedData);
          toast.success("Data updated successfully");
        })
        .catch((error) => {
          setData(originalData);
          toast.error(error.message || "Failed to update data");
        });
    } else {
      setData(originalData);
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
