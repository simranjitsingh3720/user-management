import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { COMMON_WORDS } from "../../../utils/constants";
import { buildQueryString } from "../../../utils/globalizationFunction";
import apiUrls from "../../../utils/apiUrls";

function useGetEmployeeFlag() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async ({page, pageSize, order, orderBy, resultProducersId}) => {
    try {
      setLoading(true);
      let params = {
        pageNo: page,
        sortKey: orderBy,
        sortOrder: order,
        pageSize: pageSize,
        childFieldsToFetch: `${COMMON_WORDS.PRODUCER},${COMMON_WORDS.PRODUCTS}`,
        childFieldsEdge: `${COMMON_WORDS.HAS_PRODUCER},${COMMON_WORDS.HAS_PRODUCT}`,
      };

      let url = `/${apiUrls.employeeFlag}?${buildQueryString(params)}`;

      if (resultProducersId) {
        const params = {
          edge: COMMON_WORDS.HAS_PRODUCER,
          ids: resultProducersId,
          isExclusive: true,
        };
        url += `&${buildQueryString(params)}`;
      }

      const response = await axiosInstance.get(url);
      setData(response.data);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return { employeeFlagList: data, loading, getEmployeeFlagList: fetchData };
}

export default useGetEmployeeFlag;
