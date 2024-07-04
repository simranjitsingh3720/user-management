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
  passwordRegex: /^\d{6}$/
};

export const BUTTON_TEXT = {
  CKYC_CONFIG: "Create New CKYC Config",
  Permission: "Create New Permission",
};

export const PLACEHOLDER_TEXT = {
  product: "Search by Product Name",
  lob: "Search by Lob Name",
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
