import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { API_END_POINTS } from "../../../utils/constants";

function useGetCkycData(pageChange, rowsPage) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState({
    sortKey: "createdAt",
    sortOrder: "asc",
  });

  const fetchData = async (searched, resultProductString) => {
    try {
      setLoading(true);
      let url = `/${API_END_POINTS.CKYC}?pageNo=${pageChange - 1}&sortKey=${
        sort.sortKey
      }&sortOrder=${sort.sortOrder}&pageSize=${rowsPage}`;

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
  }, [pageChange, sort, rowsPage]);

  return { data, loading, sort, setSort, fetchData };
}

export default useGetCkycData;
