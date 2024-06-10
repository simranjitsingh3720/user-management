import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

function useGetHealthConfig(pageChange, rowsPage, query, searched) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState({
    sortKey: "createdAt",
    sortOrder: "asc",
  });

  const fetchData = async (resultProducersId) => {
    try {
      setLoading(true);
      let url = `/api/health-configuration?pageNo=${pageChange - 1}&sortKey=${
        sort.sortKey
      }&sortOrder=${sort.sortOrder}&pageSize=${rowsPage}`;

      if (query && searched) {
        url += `&searchKey=${searched}&searchString=${query}`;
      }
      if (resultProducersId) {
        url += `&producers=${resultProducersId}`;
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
  }, [pageChange, sort, rowsPage, query]);

  return { data, loading, sort, setSort, fetchData };
}

export default useGetHealthConfig;
