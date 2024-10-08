import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import apiUrls from "../utils/apiUrls";
import { clearProducts } from "../stores/slices/productSlice";
import { useDispatch } from "react-redux";

function useGetLobData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  const fetchData = async () => {
    try {
      setLoading(true);
      let url = `${apiUrls.getLob}?isAll=${true}&status=${true}`;
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
    dispatch(clearProducts());
  }, [dispatch]);

  return { data, loading };
}

export default useGetLobData;
