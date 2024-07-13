import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { COMMON_WORDS } from '../utils/constants';

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

  const hasPermission = (type) => {
    return permissions[type]?.some(permission => permission.route === path);
  };

  const canCreate = hasPermission(COMMON_WORDS.CREATE);
  const canUpdate = hasPermission(COMMON_WORDS.UPDATE);
  const canRead = hasPermission(COMMON_WORDS.READ);

  return { permissions, hasPermission, canCreate, canUpdate, canRead };
};

export default usePermissions;
