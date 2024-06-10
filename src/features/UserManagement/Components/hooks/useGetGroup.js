import { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";

function useGetGroup() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      let url = `/api/group?isAll=${true}`;
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
  }, []);

  return {
    groupData: data,
    groupLoading: loading,
    groupFetchData: fetchData,
    groupSetLoading: setLoading,
  };
}

export default useGetGroup;
