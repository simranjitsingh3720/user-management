import { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";

function useGetUserType() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (roleId) => {
    try {
     if(roleId){
      let url = `/api/user-type?ids=${roleId}&edge=hasRole&isExclusive=true&status=true`;
      const response = await axiosInstance.get(url);
      setData(response?.data?.data);
     }
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
    userType: data,
    userTypeLoading: loading,
    userTypeFetch: fetchData,
    userTypeSetLoading: setLoading,
  };
}

export default useGetUserType;
