import { useCallback } from 'react';
import axiosInstance from './../../../../utils/axiosInstance';
import apiUrls from '../../../../utils/apiUrls';
import { buildQueryString } from '../../../../utils/globalizationFunction';
import { COMMON_WORDS } from '../../../../utils/constants';

function flattenNestedObjects(data) {
  const flattenedData = data.map((item) => {
    let result = {};

    if (item?.user) {
      result = { ...result, ...item.user };
    }

    if (item?.role && item?.role.length > 0) {
      result = { ...result, ...item.role[0] };
    }

    if (Array.isArray(item?.product) && item.product?.length > 0 && typeof item.product[0] === 'object') {
      result.lob = item.product.map((prod) => prod?.lobId);
    }

    if (Array.isArray(item?.product) && item?.product.length > 0) {
      result.product = item?.product.map((prod) => prod.id);
    }

    if (item?.houseBank && item?.houseBank.length > 0) {
      result = { ...result, ...item.houseBank[0] };
    }

    for (const key in item) {
      if (Array.isArray(item[key]) && item[key].length > 0 && typeof item[key][0] === 'object') {
        result[`${key}`] = item[key].map((obj) => obj.id);
      }
    }
    return result;
  });
  return flattenedData[0];
}

const useSubmit = () => {
  const getUserById = useCallback(async (id) => {
    try {
      const params = buildQueryString({
        childFieldsToFetch: `${COMMON_WORDS.ROLE},${COMMON_WORDS.LOCATION},${COMMON_WORDS.LOGIN_TYPE},${COMMON_WORDS.USER_TYPE},${COMMON_WORDS.PRODUCT},${COMMON_WORDS.LOB},${COMMON_WORDS.PRODUCER_TYPE},${COMMON_WORDS.CHANNEL},${COMMON_WORDS.PAYMENT_TYPE},${COMMON_WORDS.PARENT_ID},${COMMON_WORDS.HOUSE_BANK},${COMMON_WORDS.CHILDS}`,
        childFieldsEdge: `${COMMON_WORDS.HAS_ROLE},${COMMON_WORDS.HAS_LOCATION},${COMMON_WORDS.HAS_LOGIN_TYPE},${COMMON_WORDS.HAS_USER_TYPE},${COMMON_WORDS.HAS_PRODUCT},${COMMON_WORDS.HAS_LOB},${COMMON_WORDS.HAS_PRODUCER_TYPE},${COMMON_WORDS.HAS_CHANNEL},${COMMON_WORDS.HAS_PAYMENT_TYPE},${COMMON_WORDS.HAS_PARENT_ID},${COMMON_WORDS.HAS_HOUSE_BANK},${COMMON_WORDS.HAS_CHILDS}`,
        id: `${id}`,
      });
      let url = `${apiUrls.getUser}?${params}`;
      const { data: responseData } = await axiosInstance.get(url);
      return flattenNestedObjects(responseData.data);
    } catch (e) {
      return null;
    }
  }, []);

  return { getUserById };
};

export default useSubmit;
