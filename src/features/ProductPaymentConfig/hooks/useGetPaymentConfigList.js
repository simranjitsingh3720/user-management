import { useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { COMMON_WORDS } from '../../../utils/constants';
import { buildQueryString, formatDate } from '../../../utils/globalizationFunction';
import apiUrls from '../../../utils/apiUrls';
import errorHandler from '../../../utils/errorHandler';

function useGetPaymentConfigList() {
  const [paymentConfigList, setPaymentConfigList] = useState([]);
  const [paymentConfigLoading, setPaymentConfigLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const getPaymentConfigList = async ({
    page,
    pageSize,
    order,
    orderBy,
    searched,
    resultProductString,
    paymentTypeList,
  }) => {
    try {
      setPaymentConfigLoading(true);
      let params = {
        pageNo: page,
        pageSize,
        sortOrder: order,
        sortKey: orderBy,
        childFieldsToFetch: `${COMMON_WORDS.PAYMENTS},${COMMON_WORDS.LOBS},${COMMON_WORDS.PRODUCTS}`,
        childFieldsEdge: `${COMMON_WORDS.HAS_PAYMENT_TYPE},${COMMON_WORDS.HAS_LOB},${COMMON_WORDS.HAS_PRODUCT}`,
      };

      let url = `/${apiUrls.paymentProduct}?${buildQueryString(params)}`;
      if (searched === COMMON_WORDS.PRODUCT && resultProductString) {
        const params = {
          edge: COMMON_WORDS.HAS_PRODUCT,
          ids: resultProductString,
          isExclusive: true,
        };
        url += `&${buildQueryString(params)}`;
      }
      if (searched === COMMON_WORDS.LOB && resultProductString) {
        const params = {
          edge: COMMON_WORDS.HAS_LOB,
          ids: resultProductString,
          isExclusive: true,
        };
        url += `&${buildQueryString(params)}`;
      }

      const response = await axiosInstance.get(url);

      const { data } = response;

      const transformedData = data.data.map((item) => {
        const { lobs, productWisePaymentMethod, products } = item;
        const { lob } = lobs?.[0];
        const { product } = products?.[0];
        const { createdAt, updatedAt, label, id, paymentTypeIds } = productWisePaymentMethod;
        const paymentTypeIdsParsed = JSON.parse(paymentTypeIds);
        const updatedList = paymentTypeList.reduce((acc, item) => {
          acc[item.id] = paymentTypeIdsParsed.includes(item.id) ? 'Yes' : 'No';
          return acc;
        }, {});
        return {
          id,
          productName: product,
          lob,
          label,
          createdAt: formatDate(createdAt),
          updatedAt: formatDate(updatedAt),
          ...updatedList,
        };
      });

      setTotalCount(data.totalCount);
      setPaymentConfigList(transformedData);
    } catch (error) {
      setPaymentConfigList([]);
      errorHandler.handleError(error);
    } finally {
      setPaymentConfigLoading(false);
    }
  };

  return { paymentConfigList, paymentConfigLoading, getPaymentConfigList, totalCount };
}

export default useGetPaymentConfigList;
