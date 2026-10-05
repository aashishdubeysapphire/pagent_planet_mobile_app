import {SetStateAction} from 'react';
import translations from '../../../../../assets/translations';
import {COMPNAY_ENUM} from '../../../../../services/constants';
export const isValid = (
  data: {
    courierCompany?: string;
    otherCourierServiceName?: string;
    date?: string;
    trackingId: any;
  },
  setErrorMsg: {
    (
      value: SetStateAction<{
        courierCompany: string;
        otherCourierServiceName: string;
        date: string;
        trackingId: string;
      }>
    ): void;
    (arg0: {
      courierCompany: string;
      otherCourierServiceName: string;
      date: string;
      trackingId: string;
    }): void;
  }
) => {
  let localErr = {
    courierCompany: '',
    otherCourierServiceName: '',
    date: '',
    trackingId: '',
  };
  const isEmpty = (key: string, val = '') => {
    if (val.trim().length <= 0) {
      localErr[key] = translations.THIS_FIELD_REQUIRED;
      return false;
    } else {
      localErr[key] = '';
      return true;
    }
  };
  const conditionalFeilds = () => {
    if (data?.courierCompany?.id == COMPNAY_ENUM.IN_PERSON) {
      return isEmpty('date', data?.date);
    } else if (data?.courierCompany?.id == COMPNAY_ENUM.OTHER) {
      return isEmpty('otherCourierServiceName', data?.otherCourierServiceName);
    } else {
      return true;
    }
  };

  const trackingIdValidation = () => {
    if (data?.courierCompany?.id == COMPNAY_ENUM.IN_PERSON) {
      return true;
    } else {
      return isEmpty('trackingId', data?.trackingId);
    }
  };
  const checkAllValidation = () => {
    isEmpty('courierCompany', data?.courierCompany?.name);
    isEmpty('trackingId', data?.trackingId);
    conditionalFeilds();
    setErrorMsg(localErr);
    return (
      isEmpty('courierCompany', data?.courierCompany?.name) &&
      conditionalFeilds() &&
      trackingIdValidation()
    );
  };
  return checkAllValidation();
};
