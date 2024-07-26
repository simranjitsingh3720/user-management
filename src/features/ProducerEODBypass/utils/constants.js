import { REGEX } from '../../../utils/globalConstants';

export const textFieldValidation = {
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
    value: REGEX.reasonFieldRegex,
    message: 'Reason must be alphanumeric',
  },
};

export const SearchKey = [
  {
    label: 'Producer Name',
    value: 'producerName',
  },
  {
    label: 'Reason',
    value: 'reason',
  },
];

export const showTextField = ['reason'];

export const EXPORT_EXTRA_COLUMNS = ['firstName', 'lastName', 'producerCode'];