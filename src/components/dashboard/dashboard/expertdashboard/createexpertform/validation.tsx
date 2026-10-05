import translations from '../../../../../assets/translations';
import {isURL} from '../../../../utils/validations';
import {ROLES} from '../../../../utils/enum';

export const checkIsValid = (
  selectedProfile: any,
  userSelectedData: {
    nameOfCompnay: string;
    isCompAlsoBrand: string;
    designer: never[];
    speciality: never[];
    phone: string;
    website: string;
    tagline: string;
    about: string;
  },
  recivedLeades: never[],
  selectedLocation: never[],
  updateError: any,
  dataSourceCords: {},
  moveToErr: (key: string | undefined) => void,
) => {
  let errors = {
    locationTime: [],
  };
  const checkMinLengthValidation = (
    val: string = '',
    minLen: number = 0,
    feildName: string = '',
  ) => {
    if (val.trim().length < minLen) {
      errors[feildName] =
        translations.PLEASE_ENTER_ATLEAST + minLen + translations.CHARACTER;
      return false;
    } else {
      errors[feildName] = '';
      return true;
    }
  };
  const websiteValidation = () => {
    if (userSelectedData.website.length > 0) {
      if (!isURL(userSelectedData.website)) {
        errors.website = translations.PLEASE_ENTER_A_VALID_LINK;
        return false;
      } else {
        errors.website = '';
        return true;
      }
    } else {
      errors.website = '';
      return true;
    }
  };
  const tagLineValidation = () => {
    if (userSelectedData.tagline.length > 0) {
      return checkMinLengthValidation(userSelectedData.tagline, 2, 'tagline');
    } else {
      errors.tagline = '';
      return true;
    }
  };
  const phoneValidation = () => {
    if (userSelectedData.phone.length > 0) {
      return checkMinLengthValidation(userSelectedData.phone, 6, 'phone');
    } else {
      errors.phone = '';
      return true;
    }
  };
  const multiSelectValidation = (val, feildName) => {
    if (val.length <= 0) {
      errors[feildName] = translations.THIS_FIELD_REQUIRED;
      return false;
    } else {
      errors[feildName] = '';
      return true;
    }
  };
  const daysValidation = (selectedLocationLocal: any[], idx: number) => {
    let trueCount = 0;
    let allOpenDaysTrueCount = 0;
    let validDays;
    let allOpenDays;
    if (!!selectedLocationLocal) {
      selectedLocationLocal.forEach(i => {
        allOpenDays = i.days.filter(itm => {
          return itm.isOpen == translations.YES;
        });
        allOpenDaysTrueCount = allOpenDays.length;
      });
      selectedLocationLocal.forEach(i => {
        validDays = i.days.filter(ob => {
          return (
            ob.isOpen == translations.YES &&
            ob.from != '00:00' &&
            ob.to != '00:00'
          );
        });
        trueCount = validDays.length;
      });
    }

    if (
      trueCount != 0 &&
      allOpenDaysTrueCount != 0 &&
      allOpenDaysTrueCount == trueCount
    ) {
      errors.locationTime[idx] = '';
    } else {
      errors.locationTime[idx] = translations.YOU_NEED_TO_SET_YOUR_HOURS;
    }
  };
  const areAllLocationValid = () => {
    const includesString = errors?.locationTime.includes(
      translations.YOU_NEED_TO_SET_YOUR_HOURS,
    );

    return !includesString;
  };
  const locationValidation = () => {
    if (
      selectedProfile.display_name == ROLES.JUDGE ||
      selectedProfile.display_name == ROLES.EMCEE
    ) {
      return multiSelectValidation(selectedLocation, 'selectedLocation');
    } else {
      if (multiSelectValidation(selectedLocation, 'selectedLocation')) {
        for (let idx = 0; idx < selectedLocation.length; idx++) {
          const item = selectedLocation[idx];
          daysValidation([item], idx);
        }

        return areAllLocationValid();
      } else {
        return false;
      }
    }
  };
  const moveToTopError = () => {
    if (
      !checkMinLengthValidation(
        userSelectedData.nameOfCompnay,
        2,
        'nameOfCompnay',
      )
    ) {
      moveToErr(translations.NAME_OF_COMAPNY);
    } else if (
      !multiSelectValidation(userSelectedData.speciality, 'speciality')
    ) {
      moveToErr(translations.SPECIALTY);
    } else if (!phoneValidation()) {
      moveToErr(translations.PHONE_NUMBER);
    } else if (!websiteValidation()) {
      moveToErr(translations.WEBSITE);
    } else if (!tagLineValidation()) {
      moveToErr(translations.TAGLINE);
    } else if (!checkMinLengthValidation(userSelectedData.about, 5, 'about')) {
      moveToErr(translations.ABOUT);
    } else if (!locationValidation()) {
      moveToErr(translations.WHERE_IS_YOUR_BUSINESS_LOCATED);
    }
  };
  const commonValidation = () => {
    return (
      checkMinLengthValidation(
        userSelectedData.nameOfCompnay,
        2,
        'nameOfCompnay',
      ) &&
      phoneValidation() &&
      websiteValidation() &&
      tagLineValidation() &&
      checkMinLengthValidation(userSelectedData.about, 5, 'about') &&
      multiSelectValidation(userSelectedData.speciality, 'speciality') &&
      multiSelectValidation(recivedLeades, 'recivedLeades') &&
      locationValidation()
    );
  };
  checkMinLengthValidation(userSelectedData.nameOfCompnay, 2, 'nameOfCompnay');
  phoneValidation();
  websiteValidation();
  tagLineValidation();
  checkMinLengthValidation(userSelectedData.about, 5, 'about');
  multiSelectValidation(userSelectedData.speciality, 'speciality');
  multiSelectValidation(recivedLeades, 'recivedLeades');
  locationValidation();
  updateError(errors);

  return commonValidation() ? commonValidation() : moveToTopError();
};
