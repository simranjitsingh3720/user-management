export const drawerWidth = 240;

export const BASE_URL = "https://dev-usermgmt.tataaig.com";

export const selectRowsData = [5, 10, 15, 20];
export const alphaNumericRegex = /^[a-zA-Z0-9\s]*$/;

export const REGEX = {
  alphaNumericRegex: /^[a-zA-Z0-9\s]*$/,
  numericRegex: /^[0-9]+$/,
  letterRegex: /^[A-Za-z]+$/,
  emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  nameRegex: "^[A-Za-z]+$",
  mobileRegex: "^[0-9]*$",
  // passwordRegex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{5,}$/,
  passwordRegex: /^\d{5,10}$/,
  fullNameRegex: /^[A-Za-z]+ [A-Za-z]+$/
};

export const BUTTON_TEXT = {
  CKYC_CONFIG: "Create New CKYC Config",
  Permission: "Create New Permission",
  PARTNER_NEFT: "Create New NEFT Flag",
};

export const ProductPayment = [
  {
    label: "Product",
    value: "product",
  },
  {
    label: "LOB",
    value: "lob",
  },
];

export const COMMON_ERROR = "An error occurred. Please try again.";

export const TOKEN = 'user-token';
export const USER_DETAILS = 'user-details';
export const TOKEN_EXPIRATION = "token-expiration"
