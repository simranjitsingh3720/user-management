import { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import apiUrls from "../../../../utils/apiUrls";
import { buildQueryString } from "../../../../utils/globalizationFunction";

export default function useGetUser(page, pageSize, query, order, orderBy) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (searched, query) => {
    setLoading(true);
    try {
      const params = buildQueryString({ pageNo: page, sortOrder: order, sortKey: orderBy, pageSize, searchString: query, searchKey: searched });
      const response = await axiosInstance.get(`${apiUrls.getUser}?${params}`);
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
