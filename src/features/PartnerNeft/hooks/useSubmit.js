import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_END_POINTS } from '../utils/constant';
import axiosInstance from './../../../utils/axiosInstance';
import errorHandler from '../../../utils/errorHandler';
import toastifyUtils from '../../../utils/toastify';

const useSubmit = () => {
  const navigate = useNavigate();
  const [neftLoader, setNeftLoader] = useState(false);

  const createPartnerNeft = useCallback(
    async (data) => {
      setNeftLoader(true);
      const { lob, product, producer, verificationMethod } = data;

      const body = {
        lobId: lob.id,
        productId: product.id,
        producerId: producer.id,
        verificationMethod: verificationMethod.value,
        status: true,
      };

      try {
        const { data: responseData } = await axiosInstance.post(API_END_POINTS.POST_API, body);
        toastifyUtils.notifySuccess(responseData?.message || 'Partner NEFT created successfully');
        navigate('/partner-neft');
      } catch (error) {
        errorHandler.handleError(error);
      } finally {
        setNeftLoader(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [navigate]
  );

  const getPartnerNeft = useCallback(async (id) => {
    try {
      setNeftLoader(true);
      const { data: responseData } = await axiosInstance.get(`${API_END_POINTS.GET_API}/${id}`);
      return responseData.data;
    } catch (e) {
      return [];
    } finally {
      setNeftLoader(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatePartnerNeft = useCallback(
    async (id, data) => {
      setNeftLoader(true);
      const { producer, verificationMethod } = data;

      const body = {
        id: id,
        properties: {
          producerId: producer.id,
          verificationMethod: verificationMethod.value,
        },
      };

      try {
        const { data: responseData } = await axiosInstance.put(`${API_END_POINTS.POST_API}`, body);
        toastifyUtils.notifySuccess(responseData?.message || 'Partner NEFT updated successfully');
        navigate('/partner-neft');
      } catch (error) {
        errorHandler.handleError(error);
      } finally {
        setNeftLoader(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [navigate]
  );

  return { createPartnerNeft, getPartnerNeft, updatePartnerNeft, neftLoader };
};

export default useSubmit;
