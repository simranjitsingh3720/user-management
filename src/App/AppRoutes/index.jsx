import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PublicRoute from '../../components/PublicRoute';

const SignIn = lazy(() => import('../../features/Signin'));
const MainAppRoutes = lazy(() => import('./MainAppRoutes'));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/sign-in" />} />
      <Route
        path="/sign-in"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <PublicRoute component={SignIn} />
          </Suspense>
        }
      />
      <Route
        path="/*"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <MainAppRoutes />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
