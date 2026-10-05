import translations from '../../../../../assets/translations';
import {_validateEmail, phoneValidation} from '../../../../utils/validations';
enum FEILDNAME {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  ADDRESS = 'address',
  CITY = 'city',
  ZIPCODE = 'zipCode',
  PHONE = 'phone',
  EMAIL = 'email',
  COUNTRY = 'country',
  STATE = 'state',
}
export const isvalid = (data, countryId, stateId, onChangeErr, moveToError) => {
  const localErr = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  };
  const checkForEmpty = (info, feildName, isMinLength) => {
    if (!!info) {
      if (info.length === 0) {
        localErr[feildName] = translations.THIS_FIELD_REQUIRED;
        return false;
      } else if (info.length < 2 && isMinLength === true) {
        localErr[feildName] =
          feildName === FEILDNAME.ZIPCODE || feildName === FEILDNAME.PHONE
            ? translations.ENTER_ALTEAST_TWO_DIGIT
            : translations.ENTER_ATLEAST_TWO_CHARS;
        return false;
      } else {
        localErr[feildName] = '';
        return true;
      }
    } else {
      localErr[feildName] = translations.THIS_FIELD_REQUIRED;
    }
  };

  const isEmailValid = () => {
    if (checkForEmpty(data.email, FEILDNAME.EMAIL, true)) {
      if (_validateEmail(data.email)) {
        localErr[FEILDNAME.EMAIL] = '';
        return true;
      } else {
        localErr[FEILDNAME.EMAIL] = translations.PLEASE_ENER_A_VALID_EMAIL;
        return false;
      }
    }
  };
  const isPhoneValid = () => {
    if (checkForEmpty(data.phone, FEILDNAME.PHONE, true)) {
      if (phoneValidation(data.phone)) {
        localErr[FEILDNAME.PHONE] = '';
        return true;
      } else {
        localErr[FEILDNAME.PHONE] = translations.PLEASE_ENER_A_VALID_PHONE;
        return false;
      }
    }
  };
  const scrollToTopError = () => {
    if (
      !checkForEmpty(data.firstName, FEILDNAME.FIRST_NAME, true) ||
      !checkForEmpty(data.lastName, FEILDNAME.LAST_NAME, true)
    ) {
      moveToError(translations.FIRST_NAME);
    } else if (!isEmailValid()) {
      moveToError(translations.EMAIL + translations.ID);
    } else if (!isPhoneValid()) {
      moveToError(translations.PHONE);
    } else if (!checkForEmpty(data.address, FEILDNAME.ADDRESS, true)) {
      moveToError(translations.ADDRESS);
    } else if (!checkForEmpty(countryId, FEILDNAME.COUNTRY)) {
      moveToError(translations.COUNTRY);
    } else if (!checkForEmpty(stateId, FEILDNAME.STATE)) {
      moveToError(translations.STATE);
    } else if (!checkForEmpty(data.city, FEILDNAME.CITY, true)) {
      moveToError(translations.CITY);
    } else if (!checkForEmpty(data.zipCode, FEILDNAME.ZIPCODE, true)) {
      moveToError(translations.ZIPCODE);
    }
    return false;
  };
  const isFormValid = () => {
    checkForEmpty(data.firstName, FEILDNAME.FIRST_NAME, true);
    checkForEmpty(data.lastName, FEILDNAME.LAST_NAME, true);
    isEmailValid();
    isPhoneValid();
    checkForEmpty(data.address, FEILDNAME.ADDRESS, true);
    checkForEmpty(countryId, FEILDNAME.COUNTRY);
    checkForEmpty(stateId, FEILDNAME.STATE);
    checkForEmpty(data.city, FEILDNAME.CITY, true);
    checkForEmpty(data.zipCode, FEILDNAME.ZIPCODE, true);

    onChangeErr(localErr);

    return (
      checkForEmpty(data.firstName, FEILDNAME.FIRST_NAME, true) &&
      checkForEmpty(data.lastName, FEILDNAME.LAST_NAME, true) &&
      isEmailValid() &&
      isPhoneValid() &&
      checkForEmpty(data.address, FEILDNAME.ADDRESS, true) &&
      checkForEmpty(countryId, FEILDNAME.COUNTRY) &&
      checkForEmpty(stateId, FEILDNAME.STATE) &&
      checkForEmpty(data.city, FEILDNAME.CITY, true) &&
      checkForEmpty(data.zipCode, FEILDNAME.ZIPCODE, true)
    );
  };

  return isFormValid() ? isFormValid() : scrollToTopError();
};
