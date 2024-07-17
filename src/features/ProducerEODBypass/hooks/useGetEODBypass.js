import { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';

import { COMMON_WORDS } from '../../../utils/constants';
import { buildQueryString } from '../../../utils/globalizationFunction';
import moment from 'moment';
import apiUrls from '../../../utils/apiUrls';

const calculateUnlockedDays = (startDateString, endDateString) => {
  const startMoment = moment(startDateString, 'DD/MM/YYYY');
  const endMoment = moment(endDateString, 'DD/MM/YYYY');

  const differenceInDays = endMoment.diff(startMoment, 'days');

  return differenceInDays;
};

function useGetEODBypass(page, pageSize, date, order, orderBy) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  const fetchData = async (resultProducersId = null) => {
    try {
      setLoading(true);
      let params = buildQueryString({
        pageNo: page,
        sortKey: orderBy,
        sortOrder: order,
        pageSize: pageSize,
        childFieldsToFetch: COMMON_WORDS.PRODUCER,
        childFieldsEdge: COMMON_WORDS.HAS_PRODUCER,
      });

      if (resultProducersId) {
        let moreParams = {
          ids: resultProducersId,
          isExclusive: true,
          edge: COMMON_WORDS.HAS_PRODUCER,
        };
        params += `&${buildQueryString(moreParams)}`;
      }
      if (date?.startDate && date?.endDate) {
        let moreParams = {
          startDate: date.startDate,
          endDate: date.endDate,
        };
        params += `&${buildQueryString(moreParams)}`;
      }

      let url = `${apiUrls.getEodByPass}?${params}`;
      const response = await axiosInstance.get(url);
      const producerEodByPass = response?.data?.data?.map((item) => {
        const { producerEodByPass = {}, producer = [] } = item;
        return {
          id: producerEodByPass.id,
          label: producerEodByPass.label,
          producerName: (producer[0].firstName || '') + ' ' + (producer[0].lastName || ''),
          producerCode: producer[0].producerCode,
          unlockedDays: calculateUnlockedDays(producerEodByPass.startDate, producerEodByPass.endDate),
          reason: producerEodByPass.reason,
          startDate: producerEodByPass.startDate,
          endDate: producerEodByPass.endDate,
          createdAt: producerEodByPass.createdAt,
          updatedAt: producerEodByPass.updatedAt,
        };
      });
      setData(producerEodByPass);
      setCount(response?.data?.totalCount);
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page, pageSize, date, order, orderBy]);

  return { data, loading, fetchData, count };
}

export default useGetEODBypass;
