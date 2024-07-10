import { useState, useEffect } from "react";
import axiosInstance from './../../../utils/axiosInstance'
import { toast } from "react-toastify";
import { COMMON_ERROR } from "../../../utils/globalConstants";

const useSideNavData = () => {
  const [sideNavData, setSideNavData] = useState([]);

  useEffect(() => {
    const fetchSideNavData = async () => {
      try {
        const response = await axiosInstance.get("/api/module/all");
        setSideNavData(response.data.data);
      } catch (error) {
        toast.error(error?.response?.data?.error?.message || COMMON_ERROR);
      }
    };

    fetchSideNavData();
  }, []);

  return sideNavData;
};

export default useSideNavData;
