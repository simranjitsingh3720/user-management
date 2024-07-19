import { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import errorHandler from '../../../utils/errorHandler';
import apiUrls from '../../../utils/apiUrls';

/**
 * Custom hook to fetch all groups.
 * @returns {object} - An object containing group data and loading state.
 */
function useGetGroup() {
  const [groupData, setGroupData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`${apiUrls.getGroup}`, { params: { status: true, isAll: true } });
      const { data: { data } } = response;
      setGroupData(data);
    } catch (error) {
      errorHandler.handleError(error);
      setGroupData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { groupData, loading };
}

export default useGetGroup;
