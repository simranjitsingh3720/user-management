import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ResponsiveDrawer from "../../components/LayoutDesign";
import PartnerNeftForm from "../../features/PartnerNeft/PartnerNeftForm";
import FullPageLoader from "../../components/FullPageLoader";
import CustomTable from "../../components/CustomTable";

// Lazy load components
const UserManagement = lazy(() => import("../../features/UserManagement"));
const SignInPage = lazy(() => import("../../features/Signin/SigninPage"));
const CreateUserManagementForm = lazy(() =>
  import("../../features/UserManagement/Components/CreateForm")
);
const PermissionModule = lazy(() => import("../../features/PermissionModule"));
const RoleModule = lazy(() => import("../../features/RoleModule"));
const GroupModule = lazy(() => import("../../features/GroupModule"));
const CreateGroupForm = lazy(() =>
  import("../../features/GroupModule/CreateGroupForm copy")
);
const CreateRoleForm = lazy(() => import("../../features/RoleModule/CreateRoleForm"));
const Form = lazy(() => import("../../features/PermissionModule/Form"));
const LOBModule = lazy(() => import("../../features/LOBModule"));
const LobForm = lazy(() => import("../../features/LOBModule/LobForm"));
const Product = lazy(() => import("../../features/ProductModule"));
const ProductForm = lazy(() => import("../../features/ProductModule/ProductForm"));
const ProposalBitlyLinkConfig = lazy(() =>
  import("../../features/ProposalBitlylinkConfig")
);
const ChannelForm = lazy(() =>
  import("../../features/ProposalBitlylinkConfig/Channel/ChannelForm")
);
const OTPException = lazy(() => import("../../features/OTPException"));
const ProposalOTPException = lazy(() => import("../../features/ProposalOTPException"));
const BANCALogin = lazy(() => import("../../features/BANCALogin"));
const ProposalForm = lazy(() =>
  import("../../features/ProposalOTPException/ProposalForm")
);
const ProducerEODBypass = lazy(() => import("../../features/ProducerEODBypass"));
const ProducerEODFrom = lazy(() =>
  import("../../features/ProducerEODBypass/ProducerEODForm")
);
const ProductPaymentConfig = lazy(() => import("../../features/ProductPaymentConfig"));
const ProductPaymentConfigForm = lazy(() =>
  import("../../features/ProductPaymentConfig/ProductPaymentConfigForm")
);
const HouseBankMaster = lazy(() => import("../../features/HouseBankMaster"));
const HouseBankMasterForm = lazy(() =>
  import("../../features/HouseBankMaster/HouseBankMasterForm")
);
const HealthConfiguration = lazy(() => import("../../features/HealthConfiguration"));
const HealthConfigurationForm = lazy(() =>
  import("../../features/HealthConfiguration/HealthConfigurationForm")
);
const EmployeeFlagConfig = lazy(() => import("../../features/EmployeeFlagConfig"));

const SyncedProducers = lazy(() => import("../../features/SyncedProducer"));
const AliasUser = lazy(() => import("../../features/AliasUser"));
const NotFoundPage = lazy(() => import("../../components/NotFoundPage"));
const EmployeeConfigurationForm = lazy(() =>
  import("../../features/EmployeeFlagConfig/EmployeeConfigurationForm")
);
const RevalidationList = lazy(() => import("../../features/RevalidationList"));
const PartnerNeft = lazy(() => import("../../features/PartnerNeft"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route
          path="/custom-table"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              <CustomTable />
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
          path="/proposalOtpException/form/:id?"
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
          path="/revalidation-list"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              <RevalidationList />
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/partner-neft"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              <PartnerNeft />
            </ResponsiveDrawer>
          }
        />
        <Route
          path="partner-neft/form/:id?"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              <PartnerNeftForm />
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
        <Route
          path="/gc-sync-updation"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              <SyncedProducers />
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/alias-users"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              <AliasUser />
            </ResponsiveDrawer>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
