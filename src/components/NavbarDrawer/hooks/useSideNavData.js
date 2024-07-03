import { useState, useEffect } from "react";
import axiosInstance from './../../../utils/axiosInstance'

const useSideNavData = () => {
  const [sideNavData, setSideNavData] = useState([]);

  useEffect(() => {
    const fetchSideNavData = async () => {
      try {
        const response = await axiosInstance.get("/api/module/all");
        setSideNavData(response.data.data);
      } catch (error) {
        console.error("Error fetching side navigation data:", error);
      }
    };

    fetchSideNavData();
  }, []);

  return sideNavData;
};

export default useSideNavData;
