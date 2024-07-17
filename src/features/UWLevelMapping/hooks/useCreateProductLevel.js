import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosInstance';
import { toast } from 'react-toastify';
import { COMMON_ERROR } from '../../../utils/globalConstants';
import apiUrls from '../../../utils/apiUrls';
import { hideDialog } from '../../../stores/slices/dialogSlice';
import { useDispatch } from 'react-redux';

function useCreateProductLevel(fetchData, setEditData) {
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
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || COMMON_ERROR);
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
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || COMMON_ERROR);
    } finally {
      setLoading(false);
    }
  }
  return { postData, loading, fetchDataById, data, updateData };
}

export default useCreateProductLevel;
