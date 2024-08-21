import { useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import apiUrls from '../../../utils/apiUrls';

function useGetProducerProduct() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (id) => {
    try {
      setLoading(true);
      let url = `${apiUrls.getUser}/${id}/products`;

      const response = await axiosInstance.get(url);
      setData(response.data);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return { productList: data, fetchData, loading };
}

export default useGetProducerProduct;
