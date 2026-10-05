import Toast from 'react-native-toast-message';
import translations from '../../assets/translations';
import {capitalizeFirstLowercaseRest} from '../utils/helperFunction';

/**
 * It takes a boolean value as an argument and returns a toast message based on the value of the
 * argument
 * @param {boolean} isInternetWorking - boolean - This is the boolean value that is returned from the
 * useInternet hook.
 */
export const internetState = (isInternetWorking: boolean) => {
  if (!isInternetWorking) {
    toast(
      translations.PLEASE_CHECK_YOUR_INTERNET_CONNECTION,
      toastType.ERROR_TOAST,
    );
  } else {
    // toast(translations.INTERNET_CONNECTION_WORKING, toastType.SUCESS_TOAST);
  }
};

/**
 * It shows a toast message.
 * @param {string} title - The title of the toast
 * @param {string} type - The type of toast to show. Can be 'success', 'warning', 'danger', 'info',
 * 'default'
 * @returns A function that takes two arguments, title and type, and returns a Toast.show() function.
 */
export const toast = (
  title: string,
  type: string,
  isCapitalizationNeeded = true,
) => {
  return Toast.show({
    type: type,
    topOffset: 70,
    visibilityTime: 6000,
    text1: !!title
      ? isCapitalizationNeeded
        ? capitalizeFirstLowercaseRest(title)
        : title
      : '',
  });
};

export const toastError = (title: string) => {
  toast(title, toastType.ERROR_TOAST);
};
/* An object that is used to store the type of toast to show. */
export const toastType = {
  SUCESS_TOAST: 'successToast',
  ERROR_TOAST: 'errorToast',
};
