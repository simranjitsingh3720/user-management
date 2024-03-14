import React from "react";
import { Route, Routes } from "react-router-dom";
import ResponsiveDrawer from "../sharedComponents/LayoutDesign";
import UserManagement from "../main/UserManagement";
import SignInPage from "../main/Signin/SigninPage";
import CreateUserManagementForm from "../main/UserManagement/Components/CreateForm";
import PermissionModule from "../main/PermissionModule";
import PrivilegeForm from "../main/PermissionModule/CreatePrivilegeForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <UserManagement />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/user-management"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <UserManagement />
          </ResponsiveDrawer>
        }
      />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route
        path="/user-management/user-management-form"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <CreateUserManagementForm />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/permission"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PermissionModule />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/permission/privilege-form/:name?"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PrivilegeForm />
          </ResponsiveDrawer>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
