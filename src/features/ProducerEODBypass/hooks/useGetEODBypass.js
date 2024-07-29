import { useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';

import { COMMON_WORDS } from '../../../utils/constants';
import { buildQueryString } from '../../../utils/globalizationFunction';
import apiUrls from '../../../utils/apiUrls';
import errorHandler from '../../../utils/errorHandler';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '../../../utils/globalConstants';

const calculateUnlockedDays = (startDateString, endDateString) => {
  const startDate = dayjs(startDateString, DATE_FORMAT);
  const enddate = dayjs(endDateString, DATE_FORMAT);

  if (!startDate.isValid() || !enddate.isValid()) {
    throw new Error('Invalid date format');
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
