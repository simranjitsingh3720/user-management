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
  const startChars = "AA";
  const endChars = "ZZ";
  const modifiedString = startChars + input + endChars;
  const encodedString = btoa(modifiedString);
  return encodedString;
}
export const getDialogContent = (label) => {
  return `Are you sure you want to change the ${label} status?`;
};

export const getFullName = (firstName, lastName) => {
  return firstName?.charAt(0)?.toUpperCase() + firstName?.slice(1) + (lastName ? ' '+ lastName?.charAt(0)?.toUpperCase() + lastName?.slice(1) : '')
}

export const toCapitalize= (obj, key) => {
  return obj?.[key]?.charAt(0)?.toUpperCase() + obj?.[key]?.slice(1)
}
