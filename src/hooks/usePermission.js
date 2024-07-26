import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { COMMON_WORDS } from '../utils/constants';

/**
 * Custom hook to manage user permissions based on their roles and the current route.
 * 
 * This hook retrieves permissions from local storage and provides functions to
 * check if the user has the necessary permissions to read, create, or update
 * resources based on the current route.
 */
const usePermissions = () => {
  const [permissions, setPermissions] = useState({
    read: [],
    create: [],
    update: []
  });

  const location = useLocation();
  const path = location.pathname.split('/')[1];

  useEffect(() => {
    const storedScopes = localStorage.getItem(COMMON_WORDS.SCOPES);
    if (storedScopes) {
      const parsedScopes = JSON.parse(storedScopes);
      setPermissions(parsedScopes);
    }
  }, []);

  /**
   * Function to check if the user has a specific type of permission for the current path.
   * @param {string} type - The type of permission to check (e.g., 'read', 'create', 'update').
   * @returns {boolean} - True if the user has the permission, otherwise false.
   */
  const hasPermission = (type) => {
    return permissions[type]?.some(permission => permission.route === path);
  };

  const canCreate = hasPermission(COMMON_WORDS.CREATE);
  const canUpdate = hasPermission(COMMON_WORDS.UPDATE);
  const canRead = hasPermission(COMMON_WORDS.READ);

  return { permissions, hasPermission, canCreate, canUpdate, canRead };
};

export default usePermissions;
