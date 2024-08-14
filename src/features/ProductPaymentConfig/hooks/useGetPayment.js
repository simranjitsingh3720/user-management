import { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import apiUrls from '../../../utils/apiUrls';

function useGetPaymentType() {
  const [paymentTypeList, setPaymentTypeList] = useState([]);
  const [paymentTypeLoading, setPaymentTypeLoading] = useState(true);

  const fetchPaymentType = async () => {
    try {
      setPaymentTypeLoading(true);
      const response = await axiosInstance.get(`${apiUrls.getPaymentType}`, {
        params: {
          isAll: true,
        },
      });
      setPaymentTypeList(response.data);
    } catch (error) {
      setPaymentTypeList([]);
    } finally {
      setPaymentTypeLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentType();
  }, []);

  return { paymentTypeList, paymentTypeLoading };
}

export default useGetPaymentType;
