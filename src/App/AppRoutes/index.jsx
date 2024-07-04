import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ResponsiveDrawer from "../../components/LayoutDesign";
import PartnerNeftForm from "../../features/PartnerNeft/PartnerNeftForm";
import FullPageLoader from "../../components/FullPageLoader";
import PrivateRoute from "../../components/PrivateRoute";
import PublicRoute from "../../components/PublicRoute";
import TermCondition from "../../features/TermCondition";

const Dashboard = lazy(() => import("../../features/Dashboard"));
const UserManagement = lazy(() => import("../../features/UserManagement"));
const SignInPage = lazy(() => import("../../features/Signin/SigninPage"));
const CreateUserManagementForm = lazy(() =>
  import("../../features/UserManagement/Components/CreateForm")
);
const CreateUserCreationForm = lazy(() =>
  import("../../features/UserCreation/Components/CreateForm")
);
const PermissionModule = lazy(() => import("../../features/PermissionModule"));
const RoleModule = lazy(() => import("../../features/RoleModule"));
const GroupModule = lazy(() => import("../../features/GroupModule"));
const CreateGroupForm = lazy(() =>
  import("../../features/GroupModule/CreateGroupForm copy")
);
const CreateRoleForm = lazy(() =>
  import("../../features/RoleModule/CreateRoleForm")
);
const Form = lazy(() => import("../../features/PermissionModule/Form"));
const LOBModule = lazy(() => import("../../features/LOBModule"));
const LobForm = lazy(() => import("../../features/LOBModule/LobForm"));
const Product = lazy(() => import("../../features/ProductModule"));
const ProductForm = lazy(() =>
  import("../../features/ProductModule/ProductForm")
);
const ProposalBitlyLinkConfig = lazy(() =>
  import("../../features/ProposalBitlylinkConfig")
);
const ChannelForm = lazy(() =>
  import("../../features/ProposalBitlylinkConfig/Channel/ChannelForm")
);
const OTPException = lazy(() => import("../../features/OTPException"));
const ProposalOTPException = lazy(() =>
  import("../../features/ProposalOTPException")
);
const BANCALogin = lazy(() => import("../../features/BANCALogin"));
const ProposalForm = lazy(() =>
  import("../../features/ProposalOTPException/ProposalForm")
);
const ProducerEODBypass = lazy(() =>
  import("../../features/ProducerEODBypass")
);
const ProducerEODFrom = lazy(() =>
  import("../../features/ProducerEODBypass/ProducerEODForm")
);
const ProductPaymentConfig = lazy(() =>
  import("../../features/ProductPaymentConfig")
);
const ProductPaymentConfigForm = lazy(() =>
  import("../../features/ProductPaymentConfig/ProductPaymentConfigForm")
);
const HouseBankMaster = lazy(() => import("../../features/HouseBankMaster"));
const HouseBankMasterForm = lazy(() =>
  import("../../features/HouseBankMaster/HouseBankMasterForm")
);
const HealthConfiguration = lazy(() =>
  import("../../features/HealthConfiguration")
);
const HealthConfigurationForm = lazy(() =>
  import("../../features/HealthConfiguration/HealthConfigurationForm")
);
const EmployeeFlagConfig = lazy(() =>
  import("../../features/EmployeeFlagConfig")
);
const SyncedProducers = lazy(() => import("../../features/SyncedProducer"));
const AliasUser = lazy(() => import("../../features/AliasUser"));
const NotFoundPage = lazy(() => import("../../components/NotFoundPage"));
const EmployeeConfigurationForm = lazy(() =>
  import("../../features/EmployeeFlagConfig/EmployeeConfigurationForm")
);
const RevalidationList = lazy(() => import("../../features/RevalidationList"));
const PartnerNeft = lazy(() => import("../../features/PartnerNeft"));
const CkycConfig = lazy(() => import("../../features/CkycConfig"));
const CkycForm = lazy(() => import("../../features/CkycConfig/CykcForm"));
const CommunicationRestrictions = lazy(() =>
  import("../../features/CommunicationRestrictions")
);
const CommunicationRestrictionsForm = lazy(() =>
  import("../../features/CommunicationRestrictions/CreateForm")
);
const BulkUpload = lazy(() =>
  import("../../features/BulkUpload/UploadForm")
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/sign-in" />} />
        <Route
          path="/dashboard"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={Dashboard} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/user-management"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={UserManagement} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/user-creation"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={CreateUserCreationForm} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/communication-restrictions"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={CommunicationRestrictions} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/bulk-upload"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={BulkUpload} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/communication-restrictions/communication-restrictions-form"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={CommunicationRestrictionsForm} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/sign-in"
          element={<PublicRoute component={SignInPage} />}
        />
        <Route
          path="/user-management/user-management-form/:id?"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={CreateUserManagementForm} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/permission"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={PermissionModule} />}
            </ResponsiveDrawer>
          }
        />

        <Route
          path="/permission/permission-form"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={Form} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/roles"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={RoleModule} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/roles/role-form/:id?"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={CreateRoleForm} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/group"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={GroupModule} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/group/group-form/:id?"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={CreateGroupForm} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/lob"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={LOBModule} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/lob/lob-form"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={LobForm} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/product"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={Product} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/product/product-form"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={ProductForm} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/banca"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={BANCALogin} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/proposal-bitly-config"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={ProposalBitlyLinkConfig} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/proposal-bitly-config/channel-form"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={ChannelForm} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/otpException"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={OTPException} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/proposalOtpException"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={ProposalOTPException} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/proposalOtpException/form/:id?"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={ProposalForm} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/producer-eod-bypass-list"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={ProducerEODBypass} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/producer-eod-bypass-list/form/:id?"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={ProducerEODFrom} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/product-payment-config"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={ProductPaymentConfig} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/product-payment-config/form/:id?"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={ProductPaymentConfigForm} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/house-bank-master"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={HouseBankMaster} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/house-bank-master/form/:id?"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={HouseBankMasterForm} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/health-config"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={HealthConfiguration} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/health-config/form/:id?"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={HealthConfigurationForm} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/revalidation-list"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={RevalidationList} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/partner-neft"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={PartnerNeft} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="partner-neft/form/:id?"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={PartnerNeftForm} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/employee-flag-config"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={EmployeeFlagConfig} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/employee-flag-config/form"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={EmployeeConfigurationForm} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/gc-sync-updation"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={SyncedProducers} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/alias-users"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={AliasUser} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/ckyc-config"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={CkycConfig} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/ckyc-config/form/:id?"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              {<PrivateRoute component={CkycForm} />}
            </ResponsiveDrawer>
          }
        />
        <Route
          path="/tc-report"
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              <TermCondition />
            </ResponsiveDrawer>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
