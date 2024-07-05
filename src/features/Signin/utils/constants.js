import { REGEX } from "../../../utils/globalConstants";

export const emailValidation =  {
    required: "This field is required",
    pattern: {
      value: REGEX.emailRegex,
      message: "Please enter a valid username",
    },
};

export const passwordValidation =  {
    required: "This field is required",
    pattern: {
      value: REGEX.passwordRegex,
      message: "Please enter a valid password",
    },
};