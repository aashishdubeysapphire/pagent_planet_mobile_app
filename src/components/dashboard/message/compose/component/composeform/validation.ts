import {SetStateAction} from 'react';
import translations from '../../../../../../assets/translations';

export const isFeildValid = (
  data: string,
  setErr: {
    (value: SetStateAction<string>): void;
    (arg0: string): void;
  }
) => {
  if (!!data) {
    setErr('');
    return true;
  } else {
    setErr(translations.THIS_FIELD_REQUIRED);
    return false;
  }
};
const isProfilenamevalid = (
  selectedRadioBtn,
  profilename,
  setProfileNameErr
) => {
  if (selectedRadioBtn == translations.ALL_USERS) {
    setProfileNameErr('');
    return true;
  } else {
    return isFeildValid(profilename, setProfileNameErr);
  }
};
export const isFormValid = (
  profileType: {id: string},
  setProfileTypeErr: {
    (value: SetStateAction<string>): void;
    (arg0: string): void;
  },
  profilename: string,
  setProfileNameErr: {
    (value: SetStateAction<string>): void;
    (arg0: string): void;
  },
  description: string,
  setDescriptionErr: {
    (value: SetStateAction<string>): void;
    (arg0: string): void;
  },
  selectedRadioBtn: boolean
) => {
  isFeildValid(profileType?.id, setProfileTypeErr);
  isProfilenamevalid(selectedRadioBtn, profilename, setProfileNameErr);
  isFeildValid(description, setDescriptionErr);

  return (
    isFeildValid(profileType?.id, setProfileTypeErr) &&
    isProfilenamevalid(selectedRadioBtn, profilename, setProfileNameErr) &&
    isFeildValid(description, setDescriptionErr)
  );
};
