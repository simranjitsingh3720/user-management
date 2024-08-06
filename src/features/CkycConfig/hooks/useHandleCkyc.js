import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosInstance';
import { toast } from 'react-toastify';
import apiUrls from '../../../utils/apiUrls';
import errorHandler from '../../../utils/errorHandler';


function useHandleCkyc() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function postData(data) {
    setLoading(true);
    try {
      const payload = {
        lobId: data.lob.id,
        productId: data.product.id,
        isCKYCApplicable: data.cykc === 'enable' ? true : false,
      };

      if (payload.isCKYCApplicable) {
        payload.forWhom = data.forWhom?.value;
      }
      const response = await axiosInstance.post(`${apiUrls.ckyc}`, payload);
      toast.success(response?.data?.message || 'CKYC Created successfully');
      navigate('/ckyc-config');
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  }

  async function UpdateData(id, data) {
    setLoading(true);
    try {
      const payload = {
        id: id,
        properties: {
          isCKYCApplicable: data.cykc === 'enable' ? true : false,
        },
      };

      if (payload.properties.isCKYCApplicable) {
        payload.properties.forWhom = data.forWhom?.value;
      }
      const response = await axiosInstance.put(`${apiUrls.ckyc}`, payload);
      toast.success(response?.data?.message || 'House Bank updated successfully');
      navigate('/ckyc-config');
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  }
  return { UpdateData, postData, loading };
}

export default useHandleCkyc;
