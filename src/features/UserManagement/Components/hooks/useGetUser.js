import { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import apiUrls from "../../../../utils/apiUrls";

export default function useGetUser(page, pageSize, query, order, orderBy) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (searched, query) => {
    setLoading(true);
    try {
      let url = `${apiUrls.getUser}?pageNo=${page}&sortKey=${orderBy}&sortOrder=${order}&pageSize=${pageSize}`;
      if (query) {
        url += `&searchKey=${searched}&searchString=${query}`;
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
  }, [page, pageSize, order, orderBy]);

  return { data, loading, fetchData, setLoading };
}
