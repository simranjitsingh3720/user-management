import { useCallback } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from './../../../../utils/axiosInstance';
import { COMMON_ERROR } from './../../../../utils/globalConstants';
import apiUrls from '../../../../utils/apiUrls';
import { buildQueryString } from '../../../../utils/globalizationFunction';

function flattenNestedObjects(data) {
  return data.map((item) => {
    let result = {};

    if (item?.user) {
      result = { ...result, ...item.user };
    }

    if (item?.role && item?.role.length > 0) {
      result = { ...result, ...item.role[0] };
    }
    
    if (Array.isArray(item?.product) && item.product?.length > 0 && typeof item.product[0] === 'object') {
      result.lob = item.product.map((prod) => prod?.lob_id);
    }
    
    if (Array.isArray(item?.product) && item?.product.length > 0) {
      result.product = item?.product.map((prod) => prod?.id);
    }

    for (const key in item) {
      if (Array.isArray(item[key]) && item[key].length > 0 && typeof item[key][0] === 'object') {
        result[`${key}`] = item[key].map((obj) => obj.id);
      }
    }
    return result;
  });
}

const useSubmit = () => {
  const getUserById = useCallback(async (id) => {
    try {
      let url = `${apiUrls.getUser}?childFieldsToFetch=role,location,loginType,group,userType,product,lob,producerType,channel,paymentType&childFieldsEdge=hasRole,hasLocation,hasLoginType,hasGroup,hasUserType,hasProduct,hasLob,hasProducerType,hasChannel,hasPaymentType&id=${id}`;
      const { data: responseData } = await axiosInstance.get(url);
      return flattenNestedObjects(responseData.data)[0];
    } catch (e) {
      toast.error(e?.response?.data?.error?.message || COMMON_ERROR);
      return null;
    }
  }, []);

  return { getUserById };
};

export default useSubmit;
