import translations from '../../../../../../assets/translations';
import {toast, toastType} from '../../../../../common/commonalert';

export const isValid = (isTandCAccepted: boolean) => {
  const isTandCAcceptedValidation = () => {
    if (!isTandCAccepted) {
      toast(translations.PLEASE_ACCEPT_T_C, toastType.ERROR_TOAST);
      return false;
    } else {
      return true;
    }
  };

  const isFormValid = () => {
    isTandCAcceptedValidation();

    return isTandCAcceptedValidation();
  };
  return isFormValid();
};
