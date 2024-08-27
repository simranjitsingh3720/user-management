import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ResponsiveDrawer from '../../components/LayoutDesign';
import PrivateRoute from '../../components/PrivateRoute';
import NotFoundPage from '../../components/NotFoundPage';

// Feature Components
import Dashboard from '../../features/Dashboard';
import UserManagement from '../../features/UserManagement';
import CreateUserManagementForm from '../../features/UserManagement/Components/CreateForm';
import PermissionModule from '../../features/PermissionModule';
import RoleModule from '../../features/RoleModule';
import GroupModule from '../../features/GroupModule';
import CreateGroupForm from '../../features/GroupModule/CreateGroupForm';
import CreateRoleForm from '../../features/RoleModule/CreateRoleForm';
import Form from '../../features/PermissionModule/Form';
import Lob from '../../features/Lob';
import LobForm from '../../features/Lob/CreateLobForm';
import Product from '../../features/ProductModule';
import ProductForm from '../../features/ProductModule/ProductForm';
import Channel from '../../features/ProposalBitlylinkConfig/Channel/index';
import ChannelForm from '../../features/ProposalBitlylinkConfig/Channel/ChannelForm';
import OTPException from '../../features/OTPException';
import ProposalOTPException from '../../features/ProposalOTPException';
import BANCALogin from '../../features/BANCALogin';
import ProposalForm from '../../features/ProposalOTPException/ProposalForm';
import ProducerEODBypass from '../../features/ProducerEODBypass';
import ProducerEODForm from '../../features/ProducerEODBypass/ProducerEODForm';
import ProductPaymentConfig from '../../features/ProductPaymentConfig';
import ProductPaymentConfigForm from '../../features/ProductPaymentConfig/ProductPaymentConfigForm';
import HouseBankMaster from '../../features/HouseBankMaster';
import HouseBankMasterForm from '../../features/HouseBankMaster/HouseBankMasterForm';
import HealthConfiguration from '../../features/HealthConfiguration';
import HealthConfigurationForm from '../../features/HealthConfiguration/HealthConfigurationForm';
import EmployeeFlagConfig from '../../features/EmployeeFlagConfig';
import SyncedProducers from '../../features/SyncedProducer';
import AliasUser from '../../features/AliasUser';
import EmployeeConfigurationForm from '../../features/EmployeeFlagConfig/EmployeeConfigurationForm';
import RevalidationList from '../../features/RevalidationList';
import PartnerNeft from '../../features/PartnerNeft';
import PartnerNeftForm from '../../features/PartnerNeft/PartnerNeftForm';
import CkycConfig from '../../features/CkycConfig';
import CkycForm from '../../features/CkycConfig/CykcForm';
import CommunicationRestrictions from '../../features/CommunicationRestrictions';
import CommunicationRestrictionsForm from '../../features/CommunicationRestrictions/CreateForm';
import BulkUpload from '../../features/BulkUpload/UploadForm';
import UWLevelMapping from '../../features/UWLevelMapping';
import UWLevelMappingEmployee from '../../features/UWLevelMapping/EmployeeForm';
import UWLevelMappingForm from '../../features/UWLevelMapping/LevelMappingForm';
import SetOTPException from '../../features/OTPException/SetOTPException';
import TermCondition from '../../features/TermCondition';

const routes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/user-management', component: UserManagement },
  { path: '/communication-restrictions', component: CommunicationRestrictions },
  { path: '/:id/bulk-upload', component: BulkUpload },
  { path: '/:product/:id/bulk-upload', component: BulkUpload },
  { path: '/communication-restrictions/communication-restrictions-form', component: CommunicationRestrictionsForm },
  { path: '/user-management/form/:id?', component: CreateUserManagementForm },
  { path: '/permission', component: PermissionModule },
  { path: '/permission/permission-form', component: Form },
  { path: '/roles', component: RoleModule },
  { path: '/roles/role-form/:id?', component: CreateRoleForm },
  { path: '/group', component: GroupModule },
  { path: '/group/group-form/:id?', component: CreateGroupForm },
  { path: '/lob', component: Lob },
  { path: '/lob/lob-form', component: LobForm },
  { path: '/product', component: Product },
  { path: '/product/product-form', component: ProductForm },
  { path: '/banca', component: BANCALogin },
  { path: '/proposal-bitly-config', component: Channel },
  { path: '/proposal-bitly-config/channel-form', component: ChannelForm },
  { path: '/otpexception', component: OTPException },
  { path: '/otpexception/form', component: SetOTPException },
  { path: '/proposalotpexception', component: ProposalOTPException },
  { path: '/proposalotpexception/form/:id?', component: ProposalForm },
  { path: '/producer-eod-bypass-list', component: ProducerEODBypass },
  { path: '/producer-eod-bypass-list/form/:id?', component: ProducerEODForm },
  { path: '/product-payment-config', component: ProductPaymentConfig },
  { path: '/product-payment-config/form/:id?', component: ProductPaymentConfigForm },
  { path: '/house-bank-master', component: HouseBankMaster },
  { path: '/house-bank-master/form/:id?', component: HouseBankMasterForm },
  { path: '/health-config', component: HealthConfiguration },
  { path: '/health-config/form/:id?', component: HealthConfigurationForm },
  { path: '/revalidation-list', component: RevalidationList },
  { path: '/partner-neft', component: PartnerNeft },
  { path: '/partner-neft/form/:id?', component: PartnerNeftForm },
  { path: '/employee-flag-config', component: EmployeeFlagConfig },
  { path: '/employee-flag-config/form', component: EmployeeConfigurationForm },
  { path: '/employee-flag-config/form/:id', component: EmployeeConfigurationForm },
  { path: '/gc-sync-updation', component: SyncedProducers },
  { path: '/alias-users', component: AliasUser },
  { path: '/ckyc-config', component: CkycConfig },
  { path: '/ckyc-config/form/:id?', component: CkycForm },
  { path: '/tc-report', component: TermCondition },
  { path: '/uwlevelmappingemployee/:employeeId', component: UWLevelMapping },
  { path: '/uwlevelmappingemployee/:employeeId/form/:id?', component: UWLevelMappingForm },
  { path: '/uwlevelmappingemployee', component: UWLevelMappingEmployee },
];

const MainAppRoutes = () => {
  return (
    <Routes>
      {routes.map(({ path, component: Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <ResponsiveDrawer showSidebarAndHeader={true}>
              <PrivateRoute component={Component} />
            </ResponsiveDrawer>
          }
        />
      ))}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default MainAppRoutes;
