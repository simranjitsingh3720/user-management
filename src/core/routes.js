import React from "react";
import { Route, Routes } from "react-router-dom";
import ResponsiveDrawer from "../sharedComponents/LayoutDesign";
import UserManagement from "../main/UserManagement";
import SignInPage from "../main/Signin/SigninPage";
import CreateUserManagementForm from "../main/UserManagement/Components/CreateForm";
import PermissionModule from "../main/PermissionModule";
import RoleModule from "../main/RoleModule";
import GroupModule from "../main/GroupModule";
import CreateGroupForm from "../main/GroupModule/CreateGroupForm copy";
import CreateRoleForm from "../main/RoleModule/CreateRoleForm";
import Form from "../main/PermissionModule/Form";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PermissionModule />
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
        path="/permission/permission-form"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <Form />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/roles"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <RoleModule />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/roles/role-form/:id?"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <CreateRoleForm />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/group"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <GroupModule />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/group/group-form/:id?"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <CreateGroupForm />
          </ResponsiveDrawer>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
