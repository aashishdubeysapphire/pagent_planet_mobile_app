import {SetStateAction} from 'react';
import translations from '../../../../../../assets/translations';
import {ProductsData} from '../../../../../../services/models/sellitems/myProducts';
import {toast, toastType} from '../../../../../common/commonalert';

export const isValid = (
  addEditRequest: ProductsData,
  seterrMsg: {
    (value: SetStateAction<{}>): void;
    (arg0: {
      productCondition: string;
      country: string;
      minorFlaws: string;
      featuredImage: string;
      userAgree: string;
    }): void;
  },
  userAggredTanC: boolean,
) => {
  let localErr = {
    productCondition: '',
    country: '',
    minorFlaws: '',
    featuredImage: '',
    userAgree: '',
  };

  const checkProductContion = () => {
    if (!!addEditRequest?.worn_status?.title) {
      localErr.productCondition = '';
      return true;
    } else {
      localErr.productCondition = translations.THIS_FIELD_REQUIRED;
      return false;
    }
  };
  const minorFlaws = () => {
    if (addEditRequest?.worn_status?.id == 2) {
      if (String(addEditRequest?.flaw_detail)?.trim().length == 0) {
        localErr.minorFlaws = translations.THIS_FIELD_REQUIRED;
        return false;
      } else if (String(addEditRequest?.flaw_detail)?.trim().length == 1) {
        localErr.minorFlaws = translations.ENTER_ATLEAST_TWO_CHARS;
        return false;
      } else if (String(addEditRequest?.flaw_detail)?.trim().length >= 2) {
        localErr.minorFlaws = '';
        return true;
      }
    } else {
      return true;
    }
  };

  const countries = () => {
    if (!!addEditRequest.country_id) {
      localErr.country = '';
      return true;
    } else {
      localErr.country = translations.THIS_FIELD_REQUIRED;
    }
  };
  const imageUploaded = () => {
    if (!!addEditRequest.featured_full_path_image) {
      localErr.featuredImage = '';
      return true;
    } else {
      localErr.featuredImage = translations.THIS_FIELD_REQUIRED;
      return false;
    }
  };
  const userAgreeTC = () => {
    if (userAggredTanC) {
      localErr.userAgree = '';
      return true;
    } else {
      localErr.userAgree = translations.PLEASE_ACCEPT_T_AND_C;
      toast(translations.PLEASE_ACCEPT_T_AND_C, toastType.ERROR_TOAST);
      return false;
    }
  };
  const validations = () => {
    checkProductContion();
    minorFlaws();
    countries();
    imageUploaded();
    userAgreeTC();
    seterrMsg(localErr);

    if (
      checkProductContion() &&
      minorFlaws() &&
      countries() &&
      imageUploaded() &&
      userAgreeTC()
    ) {
      return true;
    } else {
      return false;
    }
  };
  return validations();
};
