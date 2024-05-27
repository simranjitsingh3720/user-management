import { useEffect, useState } from "react";
import axiosInstance from "../../../core/axiosInstance";

function useGetAllProducts(pageChange, rowsPage) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (resultIds) => {
    try {
      setLoading(true);
      let url = `/api/product?isAll=${true}`;
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
  }, [pageChange, rowsPage]);

  return { data, loading, fetchData };
}

export default useGetAllProducts;
