import { useState, useCallback } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeExtraColumns, setTableName } from '../../../stores/slices/exportSlice';
import { toast } from 'react-toastify';
import errorHandler from '../../../utils/errorHandler';
import { buildQueryString, formatDate } from '../../../utils/globalizationFunction';
import apiUrls from '../../../utils/apiUrls';
import { COMMON_WORDS } from '../../../utils/constants';

/**
 * Custom hook to manage roles.
 * @returns {object} - An object containing role data, loading states, and functions for CRUD operations.
 */
const useRole = (updateRoleInState) => {
  const [rolesList, setRolesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [roleData, setRoleData] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
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
            createdAt: formatDate(createdAt),
            updatedAt: formatDate(updatedAt),
            status,
            id,
            checked: status,
          };
        });

        setRolesList(transformedData);
        setTotalCount(totalCount);
      } catch (e) {
        errorHandler.handleError(e);
        setRolesList([]);
      } finally {
        setLoading(false);
      }
    },
    [rolesList]
  );

  /**
   * Function to fetch a role by ID.
   * @param {string} roleId - The ID of the role to fetch.
   */
  const fetchRoleById = async (roleId) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${apiUrls.role}/${roleId}`);
      const {
        data: { data },
      } = response;
      setRoleData(data);
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
      const response = await axiosInstance.post(`${apiUrls.role}`, data);
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
   */
  const updateRole = async (id, payload, data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.put(`${apiUrls.role}/${id}`, payload);
      toast.success(response?.data?.message || 'Role updated successfully');
      if (data) {
        updateRoleInState(id, data);
      }
      navigate('/roles');
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    rolesList,
    setRolesList,
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
