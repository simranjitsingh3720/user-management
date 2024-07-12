import { REGEX } from '../../../utils/globalConstants';

export const textFieldValidation = {
  required: 'Reason is required',
  rules: {
    required: 'Reason is required',
    minLength: {
      value: 2,
      message: 'Reason must be at least 2 characters',
    },
    maxLength: {
      value: 1000,
      message: 'Reason cannot exceed 1000 characters',
    },
    pattern: {
      value: REGEX.alphaNumericRegex,
      message: 'Reason must be alphanumeric',
    },
  },
};
