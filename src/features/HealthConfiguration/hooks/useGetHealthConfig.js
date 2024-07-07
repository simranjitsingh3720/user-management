import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { COMMON_WORDS } from "../../../utils/constants";
import { buildQueryString } from "../../../utils/globalizationFunction";
import apiUrls from "../../../utils/apiUrls";

function useGetHealthConfig(page, pageSize, order, orderBy) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const fetchData = async (resultProducersId) => {
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
        const { healthConfiguration, producer } = item;
        return {
          id: healthConfiguration.id,
          label: healthConfiguration.label,
          producerName: `${producer[0].firstName} ${producer[0].lastName}`,
          medicare: healthConfiguration.isExistingCustomer ? "yes" : "No",
          producerCode: producer[0].producerCode,
          createdAt: healthConfiguration.createdAt,
          updatedAt: healthConfiguration.updatedAt,
        };
      });
      setTotalCount(response.data.totalCount);
      setData(healthConfigData);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page, pageSize, order, orderBy]);

  return { data, loading, fetchData, totalCount };
}

export default useGetHealthConfig;
