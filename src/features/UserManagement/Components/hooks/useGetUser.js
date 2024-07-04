import { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { setTableName } from "../../../../stores/slices/exportSlice";

export default function useGetUser(pageChange = 1) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState({
    sortKey: "createdAt",
    sortOrder: "asc",
  });
  const dispatch = useDispatch();

  const fetchData = async (key, query, resultGroupId) => {
    setLoading(true);
    try {
      let url = `/api/user?pageNo=${pageChange - 1}&sortKey=${
        sort.sortKey
      }&sortOrder=${sort.sortOrder}`;
      if (key && query) {
        url += `&searchKey=${key}&searchString=${query}`;
      }
      const response = await axiosInstance.get(url);
      setData(response.data);
      if(response.data.data.length > 0) {
        dispatch(setTableName(response.data.data[0].label))
      }
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [pageChange, sort]);

  return { data, loading, fetchData, setLoading, setSort, sort };
}
