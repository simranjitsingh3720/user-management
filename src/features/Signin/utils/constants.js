import { REGEX } from '../../../utils/globalConstants';

export const emailValidation = {
  pattern: {
    value: REGEX.emailRegex,
    message: 'Please enter a valid username',
  },
};

export const DASHBOARD = '/dashboard';
