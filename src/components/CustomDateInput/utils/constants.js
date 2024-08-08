export const END_DATE = 'endDate';
export const START_DATE = 'startDate';
export const MIN_ALLOWED_DATE = '1950-01-01';

export const ERR_MSG = {
  EMPTY_START_DATE_ERR: 'Start date must be set before setting end date',
  END_DATE_LESS_ERR: 'End date must be greater than or equal to start date',
  END_DATE_WITHIN_300_DAYS: 'End date must be within 300 days from start date',
  REQUIRED_MSG: 'This field is required',
  INVALID_DATE_ERR: 'Please enter a valid date',
  MIN_DATE_ERR: 'Date cannot be before January 1, 1950',
  MAX_DATE_ERR: 'Date cannot be more than 70 years from today',
  START_DATE_LESS_THAN_TODAY_ERR: 'cannot be less than today'
};
