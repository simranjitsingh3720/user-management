import { useState, useCallback } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTableName } from '../../../stores/slices/exportSlice';
import { toast } from 'react-toastify';
import errorHandler from '../../../utils/errorHandler';
import { buildQueryString } from '../../../utils/globalizationFunction';
import apiUrls from '../../../utils/apiUrls';
import { COMMON_WORDS } from '../../../utils/constants';

/**
 * Custom hook to manage roles.
 * @returns {object} - An object containing role data, loading states, and functions for CRUD operations.
 */
const useRole = (updateRoleInState) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [roleData, setRoleData] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Function to fetch role data from the server.
   * @param {object} params - Parameters for fetching roles.
   */
  const fetchRoles = useCallback(
    async (params = {}) => {
      setLoading(true);
      try {
        const queryParams = buildQueryString({
          ...params,
          childFieldsToFetch: `${COMMON_WORDS.GROUP}`,
          childFieldsEdge: `${COMMON_WORDS.HAS_GROUP}`,
        });

        const {
          data: { data, totalCount },
        } = await axiosInstance.get(`${apiUrls.role}?${queryParams}`);

        const transformedData = data.map((item) => {
          const {
            group,
            role: { id, roleName, status, groupId, updatedAt, createdAt },
          } = item;
          return {
            roleName,
            groupName: group?.[0]?.groupName || '',
            groupId,
            createdAt,
            updatedAt,
            status,
            id,
            checked: status,
          };
        });

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

  /**
   * Function to fetch a role by ID.
   * @param {string} roleId - The ID of the role to fetch.
   */
  const fetchRoleById = async (roleId) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/role/${roleId}`);
      setRoleData(response.data);
    } catch (error) {
      errorHandler.handleError(error);
      setRoleData(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Function to create a new role.
   * @param {object} data - The data for the new role.
   */
  const createRole = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/api/role', data);
      toast.success(response?.data?.message || 'Role created successfully');
      navigate('/roles');
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Function to update an existing role.
   * @param {string} id - The ID of the role to update.
   * @param {object} data - The new data for the role.
   */
  const updateRole = async (id, payload, data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.put(`/api/role/${id}`, payload);
      toast.success(response?.data?.message || 'Role updated successfully');
      updateRoleInState(id, data);
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    setData,
    roleData,
    loading,
    totalCount,
    fetchRoles,
    fetchRoleById,
    createRole,
    updateRole,
  };
};

export default useRole;
