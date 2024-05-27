import { useEffect, useState } from "react";
import axiosInstance from "../../../core/axiosInstance";

function useGetOTPException(pageChange, rowsPage) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState({
    sortKey: "createdAt",
    sortOrder: "asc",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      let url = `/api/otp-exception?pageNo=${pageChange - 1}&sortKey=${
        sort.sortKey
      }&sortOrder=${sort.sortOrder}&pageSize=${rowsPage}`;
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
  }, [pageChange, sort, rowsPage]);

  return { data, loading, fetchData, setLoading, setSort, sort };
}

export default useGetOTPException;
