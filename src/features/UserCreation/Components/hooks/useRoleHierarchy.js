import { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";

function useGetRoleHierarchy() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (roleId) => {
    try {
     if(roleId){
      let url = `/api/role-hierarchy?roleId=${roleId}&productName=sales`;
      const response = await axiosInstance.get(url);
      setData(response?.data);
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
