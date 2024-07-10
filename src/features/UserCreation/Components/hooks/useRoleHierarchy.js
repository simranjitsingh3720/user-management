import { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import apiUrls from "../../../../utils/apiUrls";

function useGetRoleHierarchy() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (roleId) => {
    try {
      if (roleId) {
        const url = `${apiUrls.getRoleHierarchy}?roleId=${roleId}&productName=sales`;
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
    roleHierarchy: data,
    roleHierarchyLoading: loading,
    roleHierarchyFetch: fetchData,
    roleHierarchySetLoading: setLoading,
  };
}

export default useGetRoleHierarchy;
