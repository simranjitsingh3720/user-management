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
import LOBModule from "../main/LOBModule";
import LobForm from "../main/LOBModule/LobForm";
import Product from "../main/ProductModule";
import ProductForm from "../main/ProductModule/ProductForm";
import ProposalBitlyLinkConfig from "../main/ProposalBitlylinkConfig";
import ChannelForm from "../main/ProposalBitlylinkConfig/Channel/ChannelForm";
import OTPException from "../main/OTPException";
import ProposalOTPException from "../main/ProposalOTPException";
import BANCALogin from "../main/BANCALogin";
import ProposalForm from "../main/ProposalOTPException/ProposalForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
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
        path="/user-management/user-management-form/:id?"
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
      <Route
        path="/lob"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <LOBModule />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/lob/lob-form"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <LobForm />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/product"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <Product />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/product/product-form"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <ProductForm />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/banca"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <BANCALogin />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/proposal-bitly-config"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <ProposalBitlyLinkConfig />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/proposal-bitly-config/channel-form"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <ChannelForm />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/otpException"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <OTPException />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/proposalOtpException"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <ProposalOTPException />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/proposalOtpException/form"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <ProposalForm />
          </ResponsiveDrawer>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
