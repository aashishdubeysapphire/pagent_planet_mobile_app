import validator from 'is_js';
import translations from '../../assets/translations';
import {Base} from '../../services/models/base';
import {CountryResponse} from '../../services/models/country/countryResponse';
export const _validateEmail = (email: string) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

export const _validatePassword = (password: string) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  return re.test(password);
};
export const _replaceEmptySpace = (value: string) => {
  return value.replace(/\s/g, '');
};
export const CHARACTER_LENGTH = 50;

export const PASSWORD_LENGTH = 20;
export const DESCRIPTION_LENGTH = 500;

export const TITLE_LENGTH = 100;

export const removeEmojis = (string: string = '') => {
  return string.replace(
    /[^A-Za-z0-9\!\@\#\$\%\^\&\*\(\)\-\_\+\=\{\}\[\]\|\:\;\"\'\<\,\>\.\?\/\~\`\n ]/gi,
    '',
  );
};

export const onlyAlphabets = (string: string) => {
  return string.replace(/[^A-Za-z1234567890 ]/gi, '');
};

const checkEmpty = (val: string, key: string) => {
  if (validator.empty(val.trim())) {
    return `${translations.PLEASE_ENTER} ${key}`;
  } else {
    return '';
  }
};

export const checkMinLength = (val: string, minLength: number, key: string) => {
  if (val === undefined || val.trim().length < minLength) {
    return translations.THIS_FIELD_REQUIRED;
  } else {
    return '';
  }
};
export const checkMaxLength = (
  val: {trim: () => {(): any; new (): any; length: number}},
  minLength: number,
  key: any,
) => {
  if (val.trim().length > minLength) {
    return `${translations.PLEASE_ENTER} ${translations.VALID} ${key}`;
  } else {
    return '';
  }
};

export const phoneValidation = (phoneNumber: string | undefined) => {
  if (phoneNumber !== undefined) {
    if (!/^[0][1-9]$|^[1-9]\d{6,15}$/.test(phoneNumber)) {
      //min7 max 15
      return false;
    } else {
      return true;
    }
  }
};

export const ConfirmPassword = (data: {
  password: any;
  confirmPassword: any;
}) => {
  const {password, confirmPassword} = data;
  if (password !== undefined) {
    const emptyValidationText = checkEmpty(password, 'password');
    if (emptyValidationText !== '') {
      return emptyValidationText;
    } else {
      const minLengthValidation = checkMinLength(password, 8, 'password');

      if (minLengthValidation !== '') {
        if (confirmPassword !== undefined) {
          return translations.PASSWORD_MIN_LENGTH;
        }
        return minLengthValidation;
      }
    }
  }
  if (confirmPassword !== undefined) {
    const emptyValidationText = checkEmpty(confirmPassword, 'Confirm Password');
    if (emptyValidationText !== '') {
      return emptyValidationText;
    }
    if (confirmPassword !== password) {
      return translations.PASSWORD_NOT_MATCH;
    }
  }
};

export const Password = (password: string) => {
  const emptyValidationText4 = checkEmpty(password, 'password');
  if (emptyValidationText4 !== '') {
    return emptyValidationText4;
  } else {
    const minLengthValidation4 = checkMinLength(password, 8, 'password');
    if (minLengthValidation4 !== '') {
      return translations.PASSWORD_MIN_LENGTH;
    }
  }
};

export const isValueNull = (val: string | null | undefined) => {
  if (val == null || val === 'null') {
    return '';
  } else {
    return val + '';
  }
};

export const checkIsNull = (
  val: string | Base<CountryResponse> | null | undefined | any,
) => {
  return val != null && val != undefined && val != '' && val != [];
};

export const isURL = (url: string) => {
  if (!isSpaceExist(url)) {
    const res = url.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    );
    if (res !== null) {
      return validator.url(url);
    }
  } else {
    return false;
  }
};

export const doesParaContainersURL = (value: string) => {
  const res = value?.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
  );
  return res !== null;
};

export const isSpaceExist = (value: string) => {
  if (/^.+\s.+$/g.test(value)) {
    return true;
  } else {
    return false;
  }
};

export const youTubeLinkValidation = (val: string) => {
  const regEx =
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;

  return regEx.test(val);
};

export const removeEojies = (val = '') => {
  return removeEmojis(val);
};
