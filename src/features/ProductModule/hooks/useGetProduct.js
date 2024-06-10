import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

function useGetProduct(pageChange, rowsPage) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState({
    sortKey: "createdAt",
    sortOrder: "asc",
  });

  const fetchData = async (resultIds) => {
    try {
      setLoading(true);
      let url = `/api/product?pageNo=${pageChange - 1}&sortKey=${
        sort.sortKey
      }&sortOrder=${sort.sortOrder}&pageSize=${rowsPage}`;
      if (resultIds) {
        url += `&lobs=${resultIds}`;
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
  }, [pageChange, sort, rowsPage]);

  return { data, loading, sort, setSort, fetchData };
}

export default useGetProduct;
