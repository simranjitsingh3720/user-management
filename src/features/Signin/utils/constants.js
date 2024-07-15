import { REGEX } from "../../../utils/globalConstants";
export const REQUIRED_MSG = "This field is required";

export const emailValidation =  {
    required: REQUIRED_MSG,
    pattern: {
      value: REGEX.emailRegex,
      message: "Please enter a valid username",
    },
};

export const passwordValidation =  {
    required: REQUIRED_MSG,
};

export const DASHBOARD = "/dashboard";