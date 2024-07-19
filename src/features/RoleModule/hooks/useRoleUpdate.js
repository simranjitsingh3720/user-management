import { useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import errorHandler from '../../../utils/errorHandler';
import toastifyUtils from '../../../utils/toastify';

/**
 * Custom hook to handle updating a role.
 * @returns {object} - An object containing the update function and loading state.
 */
function useRoleUpdate(updateRoleInState) {
  const [loading, setLoading] = useState(false);

  /**
   * Function to update role data.
   * @param {string} id - The ID of the role to update.
   * @param {object} payload - The new data for the role.
   */
  async function updateRole(id, payload, data) {
    setLoading(true);
    try {
      const response = await axiosInstance.put(`/api/role/${id}`, payload);
      toastifyUtils.notifySuccess(response.data.message);
      updateRoleInState(id, data);
    } catch (error) {
      errorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  }

  return { updateRole, loading };
}

export default useRoleUpdate;
