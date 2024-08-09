import dayjs from 'dayjs';

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export default capitalizeFirstLetter;

export function capitalizeWords(str = '') {
  let words = str.split(' ');

  let capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));

  return capitalizedWords.join(' ');
}

/**
 * Builds a query string from the given parameters object.
 * @param {Object} params - The parameters object.
 * @returns {string} - The generated query string.
 */
export const buildQueryString = (params) => {
  return Object.keys(params)
    .filter((key) => params[key] != null && params[key] !== '' && params[key] !== undefined)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
};

/**
 * Return a string for placeholder
 */
export const getPlaceHolder = (key) => {
  return `Search by ${key} name`;
};

export const getPlaceHolderUserCreation = (key) => {
  return `Search by ${key}`;
};

export function encodeString(input) {
  const startChars = 'AA';
  const endChars = 'ZZ';
  const modifiedString = startChars + input + endChars;
  const encodedString = btoa(modifiedString);
  return encodedString;
}
export const getDialogContent = (label) => {
  return `Are you sure you want to change the ${label} status?`;
};

export const getFullName = (firstName, lastName) => {
  return (
    firstName?.charAt(0)?.toUpperCase() +
    firstName?.slice(1) +
    (lastName ? ' ' + lastName?.charAt(0)?.toUpperCase() + lastName?.slice(1) : '')
  );
};

export const toCapitalize = (obj, key) => {
  return obj?.[key]?.charAt(0)?.toUpperCase() + obj?.[key]?.slice(1);
};

/**
 * Formats a date into a string representation.
 *
 * @param {Date} date - The date to be formatted.
 * @returns {string} The formatted date string in the format 'DD MMM YYYY'.
 */
export const formatDate = (date) => {
  if (!date) return '';
  return dayjs(date).format('DD/MM/YYYY HH:mm:ss');
};

/**
 * splitCamelCase function
 * @param {string} str - The string to be formatted.
 * @returns {string} The formatted string.
 */
export const splitCamelCase = (str) => {
  return str.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
};

/**
 *  Converts a string by removing all spaces and joining the characters together.
 *  @param {string} str - The string to be formatted.
 */
export const removeSpacesAndJoin = (str) => {
  return str.replace(/\s+/g, ''); // Remove all spaces
};