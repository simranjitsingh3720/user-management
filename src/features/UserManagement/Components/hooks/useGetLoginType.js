import { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import apiUrls from "../../../../utils/apiUrls";

function useGetLoginType() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const url = `${apiUrls.getLoginType}?isAll=true&status=true`;
      const response = await axiosInstance.get(url);
      if(response?.data){
        const formattedArray = response?.data?.data?.map((obj) => ({
          ...obj,
          label: obj?.loginType?.charAt(0)?.toUpperCase() + obj?.loginType?.slice(1),
          value: obj?.loginType,
        }));
        setData(formattedArray);
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
    loginType: data,
    loginTypeLoading: loading,
    loginTypeFetchData: fetchData,
    loginTypeSetLoading: setLoading,
  };
}

export default useGetLoginType;
