import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { API_END_POINTS } from "../../../utils/constants";

function useGetCkycData(page, pageSize, order, orderBy) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (searched, resultProductString) => {
    try {
      setLoading(true);
      let url = `/${API_END_POINTS.CKYC}?pageNo=${page}&sortKey=${orderBy}&sortOrder=${order}&pageSize=${pageSize}`;

      if (searched === "product" && resultProductString) {
        url += `&edge=hasProduct&ids=${resultProductString}`;
      }
      if (searched === "lob" && resultProductString) {
        url += `&edge=hasLob&ids=${resultProductString}`;
      }
      const response = await axiosInstance.get(url);
      setData(response.data);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page, order, orderBy, pageSize]);

  return { data, loading, fetchData };
}

export default useGetCkycData;
