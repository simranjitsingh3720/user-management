import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { COMMON_WORDS } from "../../../utils/constants";
import { buildQueryString } from "../../../utils/globalizationFunction";
import apiUrls from "../../../utils/apiUrls";
import errorHandler from "../../../utils/errorHandler";

function useGetHealthConfig() {
  const [healthConfigList, setHealthConfigList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const getHealthConfigList = async ({page, pageSize, order, orderBy, resultProducersId}) => {
    try {
      setLoading(true);
      let params = {
        pageNo: page,
        sortKey: orderBy,
        sortOrder: order,
        pageSize: pageSize,
        childFieldsToFetch: `${COMMON_WORDS.PRODUCER}`,
        childFieldsEdge: `${COMMON_WORDS.HAS_PRODUCER}`,
      };

      let url = `/${apiUrls.healthConfig}?${buildQueryString(params)}`;

      if (resultProducersId) {
        const params = {
          edge: COMMON_WORDS.HAS_PRODUCER,
          ids: resultProducersId,
          isExclusive: true,
        };
        url += `&${buildQueryString(params)}`;
      }
      const response = await axiosInstance.get(url);

      const healthConfigData = response.data.data.map((item) => {
        const { healthConfiguration: {id, label, createdAt, updatedAt, isExistingCustomer}, producer } = item;

        return {
          id: id,
          label: label,
          producerName: `${producer?.[0].firstName} ${producer?.[0].lastName}`,
          medicare: isExistingCustomer ? "yes" : "No",
          producerCode: producer?.[0].producerCode,
          createdAt: createdAt,
          updatedAt: updatedAt,
        };
      });
      setTotalCount(response.data.totalCount);
      setHealthConfigList(healthConfigData);
    } catch (error) {
      setHealthConfigList([]);
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  };
  

  return { healthConfigList, loading, getHealthConfigList, totalCount };
}

export default useGetHealthConfig;
