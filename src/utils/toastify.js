import { toast } from 'react-toastify';

/**
 * Display a success notification.
 * @param {string} message - The message to display.
 */
export const notifySuccess = (message) => {
  toast.success(message);
};

/**
 * Display an error notification.
 * @param {string} message - The message to display.
 */
export const notifyError = (message) => {
  toast.error(message);
};

/**
 * Display an info notification.
 * @param {string} message - The message to display.
 */
export const notifyInfo = (message) => {
  toast.info(message);
};

/**
 * Display a warning notification.
 * @param {string} message - The message to display.
 */
export const notifyWarning = (message) => {
  toast.warning(message);
};

const toastifyUtils = {
  notifySuccess,
  notifyError,
  notifyInfo,
  notifyWarning,
};

export default toastifyUtils;
