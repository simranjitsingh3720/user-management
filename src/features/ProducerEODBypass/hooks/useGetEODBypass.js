import { useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';

import { COMMON_WORDS } from '../../../utils/constants';
import { buildQueryString, formatDate } from '../../../utils/globalizationFunction';
import apiUrls from '../../../utils/apiUrls';
import errorHandler from '../../../utils/errorHandler';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '../../../utils/globalConstants';

const calculateUnlockedDays = (startDateString, endDateString) => {
  const startDate = dayjs(startDateString, DATE_FORMAT);
  const enddate = dayjs(endDateString, DATE_FORMAT);

  if (!dayjs(startDateString, DATE_FORMAT).isValid() || !dayjs(endDateString, DATE_FORMAT).isValid()) {
    return 0;
  }

  const differenceInDays = enddate.diff(startDate, 'day');
  return differenceInDays;
};

function useGetEODBypass() {
  const [eodByPassList, setEodByPassList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const getEodByPassList = async ({ page, pageSize, order, orderBy, resultProducersId, date, query, searched }) => {
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

      if (query && searched) {
        let moreParams = {
          searchKey: searched,
          searchString: query,
        };
        params += `&${buildQueryString(moreParams)}`;
      }

      let url = `${apiUrls.getEodByPass}?${params}`;
      const response = await axiosInstance.get(url);
      const producerEodByPass = response?.data?.data?.map((item) => {
        const { producerEodByPass: {id, label, reason, startDate, endDate, createdAt, updatedAt}, producer } = item;
        const { firstName ='', lastName='', producerCode='' } = producer?.[0];
        return {
          id: id,
          label: label,
          producerName: `${firstName} ${lastName}`,
          producerCode: producerCode,
          unlockedDays: calculateUnlockedDays(startDate, endDate),
          reason: reason,
          startDate: startDate,
          endDate: endDate,
          createdAt: formatDate(createdAt),
          updatedAt: formatDate(updatedAt),
        };
      });
      setEodByPassList(producerEodByPass);
      setTotalCount(response?.data?.totalCount);
    } catch (error) {
      setEodByPassList([]);
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { eodByPassList, loading, getEodByPassList, totalCount };
}

export default useGetEODBypass;
