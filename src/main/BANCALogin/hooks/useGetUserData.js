import { useEffect, useState } from "react";
import axiosInstance from "../../../core/axiosInstance";

function useGetUserData(input) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      let url = `/api/user?pageNo=0&pageSize=1000`;
      if (input) {
        url += `&searchKey=firstName&searchString=${input}`;
      }
      const response = await axiosInstance.get(url);
      setData(response?.data?.data);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [input]);

  return {
    userData: data,
    userLoading: loading,
    userFetchData: fetchData,
  };
}

export default useGetUserData;
