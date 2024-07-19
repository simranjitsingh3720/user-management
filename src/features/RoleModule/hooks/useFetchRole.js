import { useCallback, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { buildQueryString } from '../../../utils/globalizationFunction';
import apiUrls from '../../../utils/apiUrls';
import { useDispatch } from 'react-redux';
import { setTableName } from '../../../stores/slices/exportSlice';
import { COMMON_WORDS } from '../../../utils/constants';
import errorHandler from '../../../utils/errorHandler';

/**
 * Custom hook to fetch role data.
 * @returns {object} - An object containing the fetch function, role data, loading state, total count, and a function to set role data.
 */
const useFetchRole = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const dispatch = useDispatch();

  /**
   * Function to fetch role data from the server.
   * @param {object} params - Parameters for fetching roles.
   * @param {string} params.status - Status filter.
   * @param {string} params.searchString - Search string.
   * @param {string} params.sortKey - Key to sort by.
   * @param {string} params.sortOrder - Order to sort (asc/desc).
   * @param {string} params.searchKey - Key to search by.
   * @param {number} params.pageNo - Page number.
   * @param {number} params.pageSize - Number of items per page.
   */
  const getRole = useCallback(
    async ({ status, searchString, sortKey, sortOrder, searchKey, pageNo, pageSize } = {}) => {
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
          childFieldsToFetch: `${COMMON_WORDS.GROUP}`,
          childFieldsEdge: `${COMMON_WORDS.HAS_GROUP}`,
        });

        const { data: { data, totalCount } } = await axiosInstance.get(`${apiUrls.role}?${queryParams}`);

        const transformedData = data.map((item) => {
          const { group, role: { id, roleName, status, groupId, updatedAt, createdAt } } = item;

          let groupName = '';
          if (group && group.length > 0) {
            groupName = group[0].groupName;
          }
          return {
            roleName,
            groupName,
            groupId,
            createdAt,
            updatedAt,
            status,
            id,
            checked: status,
          };
        });

        // Update the state with the fetched data
        setData(transformedData);
        dispatch(setTableName(data[0]?.tableName));
        setTotalCount(totalCount);
      } catch (e) {
        errorHandler.handleError(e);
        setData([]);
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  return {
    getRole,
    roleData: data,
    roleLoading: loading,
    totalCount,
    setRoleData: setData,
  };
};

export default useFetchRole;
