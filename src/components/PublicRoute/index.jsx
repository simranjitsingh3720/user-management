import React from 'react';
import { Navigate } from 'react-router-dom';
import { TOKEN } from '../../utils/globalConstants';

const PublicRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem(TOKEN);
  return token ? <Navigate to="/dashboard" /> : <Component {...rest} />;
};

export default PublicRoute;
