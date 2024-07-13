import EditIcon from "@mui/icons-material/Edit";

export const YES = 'yes';
export const DATE_FORMAT = "DD/MM/YYYY";
export const ROLE_SELECT = 'roleSelect';
export const PAYMENT_TYPE = 'paymentType';
export const AUTOCOMPLETE = 'autocomplete';
export const DROPDOWN = 'dropdown';
export const LOB = 'lob';
export const LOGIN_TYPE = 'loginType';
export const USER_CREATION_SUCCESS = 'User created successfully';
export const USER_UPDATED_SUCCESS = 'User updated successfully';
export const NAVIGATE_TO_DASHBOARD = '/dashboard';
export const NAVIGATE_TO_USER_MANAGEMENT = '/user-management';
export const NAVIGATE_TO_FORM = '/user-management/form'
export const REQUIRED_MSG = 'This field is required';
export const PRODUCER_ARR = ['producer', 'subproducer', 'dealer'];
export const PAYMENT_CALL = ['producer', 'subproducer', 'dealer', 'partner', 'partneremployee', 'externalposp', 'sso'];
export const PRODUCER_CODE_CALL = ['csm', 'offlineuser', 'commercialuw', 'producer', 'subproducer', 'dealer', 'partner', 'partneremployee', 'externalposp', 'sso'];
export const BUTTON_TEXT = "Create User";
export const SEARCH_PLACEHOLDER = "Search";
export const FORM_LABEL = {
  START_DATE: 'startDate',
  END_DATE: 'endDate',
  LOGIN_TYPE: 'loginType',
  LOB: 'lob',
  NT_ID: 'ntId',
  MOBILE_NO: 'mobileNo',
  STATUS: 'status',
  ROLE_NAME: 'roleName',
  LOCATION: 'location',
  PRODUCT: 'product',
  PARENT_ID: 'parentId',
  PRODUCER_TYPE: 'producerType',
  CHANNEL_ID: 'channelId',
  OCR_CHEQUE_SCANNING: 'ocrChequeScanning',
  EMPLOYEE_CODE: 'employeeCode',
  ROLE_ASSIGNED: 'roleAssigned',
  PLAN_IDS: 'planIds',
  ZONE_IDS: 'zoneIds',
};

export const FORM_VALUE = {
  LOGIN_TYPE: 'loginType',
  LOB: 'lob',
  NT_LOGIN_ID: 'ntloginId',
  MOBILE_NUMBER: 'mobileNumber',
  ACTIVE: 'active',
  YES: 'yes',
  NO: 'no',
  ROLE_SELECT: 'roleSelect',
  PARENT_CODE: 'parentCode',
  TYPE_OF_PRODUCER: 'typeOfProducer',
  CHANNEL_TYPE: 'channelType',
  CHEQUE_OCR_SCANNING: 'chequeOCRScanning',
  EMPLOYEE_CODE_USER_LOGIN_ID: 'employeeCodeUserLoginId',
  ROLE_ASSIGNMENT: 'roleAssignment',
  PLAN: 'plan',
  ZONE: 'zone',
};

export const Header = (editAction, handleInsillionStatus) => {  return[
  {
    value: "User ID",
    id: "employeeId",
  },
  {
    value: 'Name',
    id: "name"
  },
  {
    value: "NT Login",
    id: "ntId",
  },
  {
    value: "Email ID",
    id: "email",
  },
  {
    value: "Role",
    id: "roleName",
  },
  {
    value: "Created At",
    id: "createdAt",
    sortable: true
  },
  {
    value: "Status",
    id: "status",
    action: [
      {
        component: 'switch',
        onClick: (data, row) => {
          handleInsillionStatus(data, row)
        }
          
      },
    ],
  },
  // {
  //   id: "action",
  //   value: "Action",
  //   sortable: false,
  //   action: [
  //     {
  //       showIcon: true,
  //       iconName: <EditIcon />,
  //       onClick: (row) => {
  //           editAction(row)
  //       },
  //     }
  //   ],
  // },
]};

export const SEARCH_OPTIONS = [
  {
    label: "User ID",
    value: "employeeId",
  },
  {
    label: "Name",
    value:"firstName",
  },
  {
    label: "NT Login",
    value: "ntId",
  },
  {
    label: "Email ID",
    value: "email",
  },
  {
    label: "Role",
    value: "roleName",
  },
];
