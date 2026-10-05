import translations from '../../../../../../assets/translations';
import {
  checkIsNull,
  phoneValidation,
  _validateEmail,
} from '../../../../../utils/validations';

export const isValid = (data, setErrMsg) => {
  let localErr = {
    name: '',
    email: '',
    phone: '',
    location: '',
    message: '',
  };

  const nameValiation = () => {
    if (!!data.name) {
      localErr.name = '';
      return true;
    } else {
      localErr.name = translations.THIS_FIELD_REQUIRED;
      return false;
    }
  };
  const emailValidation = () => {
    if (_validateEmail(data.email.trim())) {
      localErr.email = '';
      return true;
    } else {
      localErr.email = translations.PLEASE_ENTER_VALID_EMAIL;
      return false;
    }
  };

  const _phoneValidation = () => {
    if (phoneValidation(data.phone)) {
      localErr.phone = '';
      return true;
    } else if (!checkIsNull(data.phone)) {
      localErr.phone = translations.THIS_FIELD_REQUIRED;
      return false;
    } else {
      localErr.phone = translations.PLEASE_ENER_A_VALID_PHONE;
      return false;
    }
  };

  const locationValidation = () => {
    if (!!data.location) {
      localErr.location = '';
      return true;
    } else {
      localErr.location = translations.THIS_FIELD_REQUIRED;
      return false;
    }
  };

  const msgValidation = () => {
    if (data.message.trim().length >= 2) {
      localErr.message = '';
      return true;
    } else {
      if (data.message.trim().length < 1) {
        localErr.message = translations.THIS_FIELD_REQUIRED;
      } else if (data.message.trim().length < 3) {
        localErr.message = translations.ENTER_ATLEAST_TWO_CHARS;
      }
      return false;
    }
  };

  const formValidation = () => {
    nameValiation();
    emailValidation();
    _phoneValidation();
    locationValidation();
    msgValidation();
    setErrMsg(localErr);

    return (
      nameValiation() &&
      emailValidation() &&
      _phoneValidation() &&
      locationValidation() &&
      msgValidation()
    );
  };

  return formValidation();
};
