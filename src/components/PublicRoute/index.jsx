import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    isAuthenticated() ? <Navigate to="/dashboard" /> : <Component {...rest} /> 
  );
};

export default PublicRoute;
