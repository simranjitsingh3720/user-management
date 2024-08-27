import React, { useEffect, useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { TOKEN, TOKEN_EXPIRATION_ERROR } from '../../utils/globalConstants';
import toastifyUtils from '../../utils/toastify';
import { COMMON_WORDS } from '../../utils/constants';
import errorHandler from '../../utils/errorHandler';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  const token = localStorage.getItem(TOKEN);

  const parsedScopes = useMemo(() => {
    try {
      const storedScopes = localStorage.getItem(COMMON_WORDS.SCOPES);
      return storedScopes ? JSON.parse(storedScopes) : null;
    } catch (error) {
      errorHandler.handleError(error);
      return null;
    }
  }, []);

  const hasPermission = useMemo(
    () => parsedScopes?.read.some((permission) => permission.route === path),
    [parsedScopes, path]
  );

  useEffect(() => {
    if (!token) {
      toastifyUtils.notifyError(TOKEN_EXPIRATION_ERROR);
    }
  }, [token]);

  if (!token || !hasPermission) {
    return <Navigate to="/" />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
