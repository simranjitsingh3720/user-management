import axiosInstance from "../../../utils/axiosInstance"; 

import { useEffect, useState } from "react";
import apiUrls from "../../../utils/apiUrls";

function useGetPrivilege(page, pageSize, query, order, orderBy) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (searched, query) => {
    try {
      setLoading(true);
      let url = `${apiUrls.getPermission}?pageNo=${page}&sortKey=${orderBy}&sortOrder=${order}&pageSize=${pageSize}`;
      if (query) {
        url += `&searchKey=${searched}&searchString=${query}`;
      }
      const response = await axiosInstance.get(url);
      const transformedData =
        response?.data?.data.map((item) => ({
          ...item,
          checked: item.status,
        })) || [];
      setData(transformedData);
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

export default useGetPrivilege;
