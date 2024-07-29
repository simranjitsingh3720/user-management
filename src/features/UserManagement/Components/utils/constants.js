import EditIcon from '@mui/icons-material/Edit';

export const ARR_CONTAINS = {
  PRODUCER_ARR: ['producer', 'subproducer', 'dealer'],
  PRODUCER_PARTNER_ARR: ['producer', 'subproducer', 'dealer', 'partner'],
  PAYMENT_CALL: ['producer', 'subproducer', 'dealer', 'partner', 'partneremployee', 'externalposp', 'sso'],
  PRODUCER_CODE_CALL: [
    'csm',
    'offlineuser',
    'commercialuw',
    'producer',
    'subproducer',
    'dealer',
    'partner',
    'partneremployee',
    'externalposp',
    'sso',
  ],
  ADMIN_ARR: ['admin', 'adminView'],
  CLIENT_ARR: ['csm'],
  DATA_ENTRY_USER_ARR: ['distops'],
  PLAN_ZONE_ARR: ['partneremployee', 'sso', 'externalposp'],
  MASTER_POLICY_ARR: ['partner']
};

export const NAVIGATE = {
  NAVIGATE_TO_DASHBOARD: '/dashboard',
  NAVIGATE_TO_USER_MANAGEMENT: '/user-management',
  NAVIGATE_TO_FORM: '/user-management/form',
};

export const REQUIRED_ERR = {
  ROLE: 'Role is required',
  LOGIN_TYPE: 'Login Type is required',
};

export const COMMON = {
  BUTTON_TEXT: 'Create User',
  SEARCH_PLACEHOLDER: 'Search',
  REQUIRED_MSG: 'This field is required',
  YES: 'yes',
  NO: 'no',
  DATE_FORMAT: 'DD/MM/YYYY',
  DATE_FORMAT_2: 'MM/DD/YYYY',
  ROLE_SELECT: 'roleSelect',
  PAYMENT_TYPE: 'paymentType',
  AUTOCOMPLETE: 'autocomplete',
  DROPDOWN: 'dropdown',
  LOB: 'lob',
  LOGIN_TYPE: 'loginType',
  CHEQUE: 'cheque',
  USER_CREATION_SUCCESS: 'User created successfully',
  USER_UPDATED_SUCCESS: 'User updated successfully',
  PARTNER: 'partner',
  DEFAULT_HOUSE_BANK: 'neftDefaultBank',
  PAYMENT_NEFT: 'neft',
  ACCOUNT_NUMBER: 'accountNumber',
  PAYMENT_CHEQUE: 'cheque',
  ALL: 'all',
  ACTIVE: 'Active'
};

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
  CHANNEL_ID: 'channel',
  OCR_CHEQUE_SCANNING: 'ocrChequeScanning',
  EMPLOYEE_CODE: 'employeeCode',
  ROLE_ASSIGNED: 'roleAssigned',
  PLAN_IDS: 'planIds',
  ZONE_IDS: 'zoneIds',
  CKYC: 'ckyc',
  SEND_EMAIL: 'sendEmail',
  PAYMENT_TYPE: 'paymentType',
  GC_STATUS: 'gcStatus',
  CHILDS: 'childs',
  HOUSE_BANK: 'houseBank',
  MASTER_POLICY: 'masterPolicy',
  PLAN: 'plan'
};

export const FORM_VALUE = {
  LOGIN_TYPE: 'loginType',
  LOB: 'lob',
  NT_LOGIN_ID: 'ntloginId',
  MOBILE_NUMBER: 'mobileNumber',
  ACTIVE: 'active',
  YES: 'yes',
  NO: 'no',
  LOCATION: 'location',
  ROLE_SELECT: 'roleSelect',
  PARENT_CODE: 'parentCode',
  TYPE_OF_PRODUCER: 'typeOfProducer',
  CHANNEL_TYPE: 'channelType',
  CHEQUE_OCR_SCANNING: 'chequeOCRScanning',
  EMPLOYEE_CODE_USER_LOGIN_ID: 'employeeCodeUserLoginId',
  ROLE_ASSIGNMENT: 'roleAssignment',
  PRODUCER_TYPE: 'producerType',
  PLAN: 'plan',
  ZONE: 'zone',
  CKYC: 'cKyc',
  SEND_EMAIL: 'sendEmail',
  PAYMENT_TYPE: 'paymentType',
  PRODUCER_CODE: 'producerCode',
  NEFT_DEFAULT_BANK: 'neftDefaultBank',
};

export const Header = (editAction, handleInsillionStatus) => {
  return [
    {
      value: 'User ID',
      id: 'employeeId',
    },
    {
      value: 'Name',
      id: 'name',
    },
    {
      value: 'NT Login',
      id: 'ntId',
    },
    {
      value: 'Email ID',
      id: 'email',
    },
    {
      value: 'Role',
      id: 'roleName',
    },
    {
      value: 'Created At',
      id: 'createdAt',
      sortable: true,
    },
    {
      value: 'Status',
      id: 'status',
      action: [
        {
          component: 'switch',
          onClick: (data, row) => {
            handleInsillionStatus(data, row);
          },
        },
      ],
    },
    {
      id: 'action',
      value: 'Action',
      sortable: false,
      action: [
        {
          showIcon: true,
          iconName: <EditIcon />,
          onClick: (row) => {
            editAction(row);
          },
        },
      ],
    },
  ];
};

export const SEARCH_OPTIONS = [
  {
    label: 'User ID',
    value: 'employeeId',
  },
  {
    label: 'First Name',
    value: 'firstName',
  },
  {
    label: 'Last Name',
    value: 'lastName',
  },
  {
    label: 'NT Login',
    value: 'ntId',
  },
  {
    label: 'Email ID',
    value: 'email',
  },
  {
    label: 'Role',
    value: 'roleName',
  },
];

export const MASTER_POLICY = {
  TRAVEL: 'travel',
  GROUPBUSINESSTRAVELACCIDENT: 'groupbusinesstravelaccident',
  SMALLBUSINESSTRAVELGUARD: 'smallbusinesstravelguard',
  BOTH: 'both',
};
