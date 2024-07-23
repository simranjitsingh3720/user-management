import { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import apiUrls from "../../../../utils/apiUrls";
import { buildQueryString } from "../../../../utils/globalizationFunction";

function useHouseBank() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (userId) => {
    try {
     if(userId){
      const params = buildQueryString({ids: userId, edge: 'hasProducer', isExclusive: true, status: true});
      const response = await axiosInstance.get(`${apiUrls.getHouseBank}?${params}`);
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
    houseBank: data,
    houseBankLoading: loading,
    houseBankFetch: fetchData,
    houseBankSetLoading: setLoading,
  };
}

export default useHouseBank;
