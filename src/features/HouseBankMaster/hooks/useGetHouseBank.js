import { useCallback, useState } from 'react';
import axiosInstance from './../../../utils/axiosInstance';

import { buildQueryString } from '../../../utils/globalizationFunction';
import apiUrls from "../../../utils/apiUrls";
import { useDispatch } from 'react-redux';
import { setTableName } from '../../../stores/slices/exportSlice';

const useGetHouseBank = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const dispatch = useDispatch();

  const getHouseBank = useCallback(
    async ({
      isAll,
      status,
      searchString,
      sortKey,
      sortOrder,
      searchKey,
      pageNo,
      pageSize,
      isExclusive,
    } = {}) => {
      setLoading(true);
      try {
        const queryParams = buildQueryString({
          status,
          pageNo,
          pageSize,
          searchString,
          searchKey,
          sortKey,
          sortOrder,
          isAll,
          isExclusive,
        });

        const {data} = await axiosInstance.get(`${apiUrls.houseBank}?${queryParams}`);
        setData(data?.data);
        dispatch(setTableName(data?.data[0]?.label));
        setTotalCount(data.totalCount);
      } catch (e) {
        setData([]);
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  return {
    getHouseBank,
    houseBankData: data,
    houseBankLoading: loading,
    totalCount,
  };
};

export default useGetHouseBank;
