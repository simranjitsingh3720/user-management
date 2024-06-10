import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

function useGetPaymentConfig(pageChange, rowsPage, query, searched) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState({
    sortKey: "createdAt",
    sortOrder: "asc",
  });

  const fetchData = async (searched, resultProductString) => {
    try {
      setLoading(true);
      let url = `/api/product-wise-payment-method?pageNo=${
        pageChange - 1
      }&sortKey=${sort.sortKey}&sortOrder=${
        sort.sortOrder
      }&pageSize=${rowsPage}`;
      if (searched === "product" && resultProductString) {
        url += `&edge=hasProducer&ids=${resultProductString}`;
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
  }, [pageChange, sort, rowsPage]);

  return { data, loading, sort, setSort, fetchData };
}

export default useGetPaymentConfig;
