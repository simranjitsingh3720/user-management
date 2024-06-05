import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ResponsiveDrawer from "../sharedComponents/LayoutDesign";

// Lazy load components
const UserManagement = lazy(() => import("../main/UserManagement"));
const SignInPage = lazy(() => import("../main/Signin/SigninPage"));
const CreateUserManagementForm = lazy(() => import("../main/UserManagement/Components/CreateForm"));
const PermissionModule = lazy(() => import("../main/PermissionModule"));
const RoleModule = lazy(() => import("../main/RoleModule"));
const GroupModule = lazy(() => import("../main/GroupModule"));
const CreateGroupForm = lazy(() => import("../main/GroupModule/CreateGroupForm copy"));
const CreateRoleForm = lazy(() => import("../main/RoleModule/CreateRoleForm"));
const Form = lazy(() => import("../main/PermissionModule/Form"));
const LOBModule = lazy(() => import("../main/LOBModule"));
const LobForm = lazy(() => import("../main/LOBModule/LobForm"));
const Product = lazy(() => import("../main/ProductModule"));
const ProductForm = lazy(() => import("../main/ProductModule/ProductForm"));
const ProposalBitlyLinkConfig = lazy(() => import("../main/ProposalBitlylinkConfig"));
const ChannelForm = lazy(() => import("../main/ProposalBitlylinkConfig/Channel/ChannelForm"));
const OTPException = lazy(() => import("../main/OTPException"));
const ProposalOTPException = lazy(() => import("../main/ProposalOTPException"));
const BANCALogin = lazy(() => import("../main/BANCALogin"));
const ProposalForm = lazy(() => import("../main/ProposalOTPException/ProposalForm"));
const ProducerEODBypass = lazy(() => import("../main/ProducerEODBypass"));
const ProducerEODFrom = lazy(() => import("../main/ProducerEODBypass/ProducerEODForm"));
const ProductPaymentConfig = lazy(() => import("../main/ProductPaymentConfig"));
const ProductPaymentConfigForm = lazy(() => import("../main/ProductPaymentConfig/ProductPaymentConfigForm"));
const HouseBankMaster = lazy(() => import("../main/HouseBankMaster"));
const HouseBankMasterForm = lazy(() => import("../main/HouseBankMaster/HouseBankMasterForm"));
const HealthConfiguration = lazy(() => import("../main/HealthConfiguration"));
const HealthConfigurationForm = lazy(() => import("../main/HealthConfiguration/HealthConfigurationForm"));
const EmployeeFlagConfig = lazy(() => import("../main/EmployeeFlagConfig"));
const EmployeeConfigurationForm = lazy(() => import("../main/EmployeeFlagConfig/EmployeeConfigurationForm"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
        <Route
          path="/producer-eod-bypass-list"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              <ProducerEODBypass />
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/producer-eod-bypass-list/form/:id?"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              <ProducerEODFrom />
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/product-payment-config"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              <ProductPaymentConfig />
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/product-payment-config/form/:id?"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              <ProductPaymentConfigForm />
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/house-bank-master"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              <HouseBankMaster />
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/house-bank-master/form/:id?"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              <HouseBankMasterForm />
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/health-config"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              <HealthConfiguration />
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/health-config/form/:id?"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              <HealthConfigurationForm />
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/employee-flag-config"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              <EmployeeFlagConfig />
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/employee-flag-config/form"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              <EmployeeConfigurationForm />
            </ResponsiveDrawer>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
