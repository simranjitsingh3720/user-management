import axiosInstance from "../../../core/axiosInstance"; // Import the instance
import { useEffect, useState } from "react";
import { createContext } from "react";

export const GetUserContext = createContext();

const GetUserData = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const fetchData = async () => {
    try {
      let url = `/api/permission?pageNo=${page}&pageSize=10`;
      const response = await axiosInstance.get(url);
      setData((prev) => [...prev, ...response?.data?.data]);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <GetUserContext.Provider
      value={{
        userData: data,
        userLoading: loading,
        userFetchData: fetchData,
        page,
        setPage,
      }}
    >
      {children}
    </GetUserContext.Provider>
  );
};

export default GetUserData;
