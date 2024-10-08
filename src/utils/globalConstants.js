export const drawerWidth = 240;
export const BASE_URL = 'https://dev-usermgmt.tataaig.com/dev-user-management';
export const MODULE_TYPE = 'um';
export const selectRowsData = [5, 10, 15, 20];
export const PAGECOUNT = 10;
export const COMMON_ERROR = 'An error occurred. Please try again.';
export const TOKEN = 'user-token';
export const USER_DETAILS = 'user-details';
export const TOKEN_EXPIRATION_ERROR = 'Your session has expired. Please log in again!';
export const DATE_FORMAT = 'DD/MM/YYYY';
export const CLIENT_TYPE = 'web';
export const TOKEN_REDIRECTION_DETAILS = 'TokenRedirectionDetails';
export const INVALID_CREDENTIALS = 'invalid credentials';

export const REGEX = {
  alphaNumericRegex: /^[a-zA-Z0-9\s]*$/,
  bankCodeRegex: /^[A-Za-z]{4}0[A-Za-z0-9]{6}$/,
  numericRegex: /^[0-9]+$/,
  letterRegex: /^[A-Za-z]+$/,
  emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  nameRegex: '^[A-Za-z]+$',
  mobileRegex: /^[6-9][0-9]{9}$/,
  passwordRegex: /^\d{5,10}$/,
  fullNameRegex: /^[A-Za-z]+ [A-Za-z]+$/,
  reasonFieldRegex: /^[a-zA-Z0-9\s.,!?'"()-]*$/,
};

export const STATUS = [
  {
    id: 'active',
    label: 'Active',
    value: 'active',
  },
  {
    id: 'inactive',
    label: 'Inactive',
    value: 'inactive',
  },
];

export const ProductPayment = [
  {
    label: 'Product',
    value: 'product',
  },
  {
    label: 'LOB',
    value: 'lob',
  },
];
