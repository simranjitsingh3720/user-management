import axios from "axios";
import { useEffect, useState } from "react";

function useGetPrivilege(pageChange = 1) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (key, value) => {
    try {
      const response = await axios.get(
        `https://dev-usermgmt.tataaig.com/api/permission?pageNo=${
          pageChange - 1
        }&${key}=${value}`
      );
      console.log("response", response);
      setData(response.data);
    } catch (error) {
      console.log(error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [pageChange]);

  return { data, loading, fetchData, setLoading };
}

export default useGetPrivilege;
