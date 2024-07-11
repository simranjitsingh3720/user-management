import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ResponsiveDrawer from '../../components/LayoutDesign';
import PartnerNeftForm from '../../features/PartnerNeft/PartnerNeftForm';
import PrivateRoute from '../../components/PrivateRoute';
import PublicRoute from '../../components/PublicRoute';
import TermCondition from '../../features/TermCondition';
import Dashboard from '../../features/Dashboard';
import UserManagement from '../../features/UserManagement';
import SignInPage from '../../features/Signin/SigninPage';
import CreateUserManagementForm from '../../features/UserManagement/Components/CreateForm';
import PermissionModule from '../../features/PermissionModule';
import RoleModule from '../../features/RoleModule';
import GroupModule from '../../features/GroupModule';
import CreateGroupForm from '../../features/GroupModule/CreateGroupForm copy';
import CreateRoleForm from '../../features/RoleModule/CreateRoleForm';
import Form from '../../features/PermissionModule/Form';
import Lob from '../../features/Lob';
import LobForm from '../../features/Lob/CreateLobForm';
import Product from '../../features/ProductModule';
import ProductForm from '../../features/ProductModule/ProductForm';
import ProposalBitlyLinkConfig from '../../features/ProposalBitlylinkConfig';
import ChannelForm from '../../features/ProposalBitlylinkConfig/Channel/ChannelForm';
import OTPException from '../../features/OTPException';
import ProposalOTPException from '../../features/ProposalOTPException';
import BANCALogin from '../../features/BANCALogin';
import ProposalForm from '../../features/ProposalOTPException/ProposalForm';
import ProducerEODBypass from '../../features/ProducerEODBypass';
import ProducerEODFrom from '../../features/ProducerEODBypass/ProducerEODForm';
import ProductPaymentConfig from '../../features/ProductPaymentConfig';
import ProductPaymentConfigForm from '../../features/ProductPaymentConfig/ProductPaymentConfigForm';
import HouseBankMaster from '../../features/HouseBankMaster';
import HouseBankMasterForm from '../../features/HouseBankMaster/HouseBankMasterForm';
import HealthConfiguration from '../../features/HealthConfiguration';
import HealthConfigurationForm from '../../features/HealthConfiguration/HealthConfigurationForm';
import EmployeeFlagConfig from '../../features/EmployeeFlagConfig';
import SyncedProducers from '../../features/SyncedProducer';
import AliasUser from '../../features/AliasUser';
import NotFoundPage from '../../components/NotFoundPage';
import EmployeeConfigurationForm from '../../features/EmployeeFlagConfig/EmployeeConfigurationForm';
import RevalidationList from '../../features/RevalidationList';
import PartnerNeft from '../../features/PartnerNeft';
import CkycConfig from '../../features/CkycConfig';
import CkycForm from '../../features/CkycConfig/CykcForm';
import CommunicationRestrictions from '../../features/CommunicationRestrictions';
import CommunicationRestrictionsForm from '../../features/CommunicationRestrictions/CreateForm';
import BulkUpload from '../../features/BulkUpload/UploadForm';
import UWLevelMapping from '../../features/UWLevelMapping';
import UWLevelMappingEmployee from '../../features/UWLevelMapping/EmployeeForm';
import UWLevelMappingForm from '../../features/UWLevelMapping/LevelMappingForm';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/sign-in" />} />
      <Route
        path="/dashboard"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={Dashboard} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/user-management"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={UserManagement} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/communication-restrictions"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={CommunicationRestrictions} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/bulk-upload"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={BulkUpload} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/communication-restrictions/communication-restrictions-form"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={CommunicationRestrictionsForm} />
          </ResponsiveDrawer>
        }
      />
      <Route path="/sign-in" element={<PublicRoute component={SignInPage} />} />
      <Route
        path="/user-management/user-management-form/:id?"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={CreateUserManagementForm} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/permission"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={PermissionModule} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/permission/permission-form"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={Form} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/roles"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={RoleModule} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/roles/role-form/:id?"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={CreateRoleForm} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/group"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={GroupModule} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/group/group-form/:id?"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={CreateGroupForm} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/lob"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={Lob} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/lob/lob-form"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={LobForm} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/product"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={Product} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/product/product-form"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={ProductForm} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/banca"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={BANCALogin} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/proposal-bitly-config"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={ProposalBitlyLinkConfig} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/proposal-bitly-config/channel-form"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={ChannelForm} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/otpException"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={OTPException} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/proposalOtpException"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={ProposalOTPException} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/proposalOtpException/form/:id?"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={ProposalForm} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/producer-eod-bypass-list"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={ProducerEODBypass} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/producer-eod-bypass-list/form/:id?"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={ProducerEODFrom} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/product-payment-config"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={ProductPaymentConfig} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/product-payment-config/form/:id?"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={ProductPaymentConfigForm} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/house-bank-master"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={HouseBankMaster} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/house-bank-master/form/:id?"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={HouseBankMasterForm} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/health-config"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={HealthConfiguration} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/health-config/form/:id?"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={HealthConfigurationForm} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/revalidation-list"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={RevalidationList} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/partner-neft"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={PartnerNeft} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="partner-neft/form/:id?"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={PartnerNeftForm} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/employee-flag-config"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={EmployeeFlagConfig} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/employee-flag-config/form"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={EmployeeConfigurationForm} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/gc-sync-updation"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={SyncedProducers} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/alias-users"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={AliasUser} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/ckyc-config"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={CkycConfig} />
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/ckyc-config/form/:id?"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            <PublicRoute component={CkycForm} />
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
      <Route
        path="uwlevelmappingemployee/:employeeId"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>{<PublicRoute component={UWLevelMapping} />}</ResponsiveDrawer>
        }
      />
      <Route
        path="uwlevelmappingemployee/:employeeId/form/:id?"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            {<PublicRoute component={UWLevelMappingForm} />}
          </ResponsiveDrawer>
        }
      />
      <Route
        path="/uwlevelmappingemployee"
        element={
          <ResponsiveDrawer showSidebarAndHeader={true}>
            {<PublicRoute component={UWLevelMappingEmployee} />}
          </ResponsiveDrawer>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
