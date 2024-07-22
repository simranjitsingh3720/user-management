import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosInstance';
import { toast } from 'react-toastify';

import apiUrls from '../../../utils/apiUrls';
import { hideDialog } from '../../../stores/slices/dialogSlice';
import { useDispatch } from 'react-redux';
import errorHandler from '../../../utils/errorHandler';

function useCreateProductLevel(fetchData, setEditData, handleReset) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const params = useParams();
  const { employeeId } = params;
  const dispatch = useDispatch();

  const navigate = useNavigate();

  async function postData(data) {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`${apiUrls.productLocationLevelMapping}`, data);
      toast.success(response?.data?.message || 'Product Level Mapping Created successfully');
      navigate(`/uwlevelmappingemployee/${employeeId}`);
      if (fetchData) {
        fetchData();
      }
      if (handleReset) {
        handleReset();
      }
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  }
  const fetchDataById = async (healthConfigId) => {
    try {
      let url = `/${apiUrls.productLocationLevelMapping}/${healthConfigId}`;

      const response = await axiosInstance.get(url);
      setData(response.data);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  async function updateData(payload) {
    setLoading(true);
    try {
      const response = await axiosInstance.put(`${apiUrls.productLocationLevelMapping}`, payload);
      toast.success(response?.data?.message || 'Product Level Mapping updated successfully');
      dispatch(hideDialog());
      if (fetchData) {
        fetchData();
      }
      if (setEditData) {
        setEditData([]);
      }
      if (handleReset) {
        handleReset();
      }
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  }
  const getLobByUserId = useCallback(async (employeeId) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${apiUrls.getUser}/${employeeId}/lobs`);
      console.log('response', response);
      const { data = {} } = response || {};
      const { data: lobList = [] } = data;
      setData(lobList);
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { postData, loading, fetchDataById, data, updateData, getLobByUserId };
}

export default useCreateProductLevel;
