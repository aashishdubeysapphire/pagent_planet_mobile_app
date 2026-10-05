import translations from '../../../../assets/translations';
import {toast, toastType} from '../../../common/commonalert';
import {checkIsNull} from '../../../utils/validations';

export const validation = (data, setErr, selectedType, moveToError) => {
  let localErr = {
    bankName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    nameOnTheAccount: '',
    whereWouldYouLikeTransfer: '',
    routingNumber: '',
    currency: '',
    country: '',
    address: '',
    swiftCode: '',
  };

  const emptyValidation = (val, name, showYour = true) => {
    if (checkIsNull(data[val]) && !!data[val]) {
      localErr[val] = '';
      return true;
    } else {
      localErr[val] =
        name == translations.WHERE_WOULD_YOU_LIKE_TO_TRANSFER
          ? translations.THIS_FIELD_REQUIRED
          : translations.ENTER +
            (showYour ? translations.YOUR + ' ' : '') +
            name;
      return false;
    }
  };

  const isAccountNumberValid = () => {
    if (emptyValidation('accountNumber', translations.ACCOUNT_NUMBER)) {
      if (data.accountNumber.trim().length < 3) {
        localErr.accountNumber = translations.ACCOUNT_NUMBER_ERR;
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };
  const isConfirmAccountNumberValid = () => {
    if (emptyValidation('confirmAccountNumber', translations.ACCOUNT_NUMBER)) {
      if (
        !!data.accountNumber &&
        data.confirmAccountNumber.trim() != data.accountNumber.trim()
      ) {
        localErr.confirmAccountNumber = translations.ENTER_SAME_ACCOUNT_NUMBER;
        return false;
      } else {
        return true;
      }
    }
  };

  const isT_Cchecked = () => {
    if (data.isTandCAccepted) {
      return true;
    } else {
      toast(translations.PLEASE_ACCEPT_T_C, toastType.ERROR_TOAST);
    }
  };

  const isNameOfAccount = () => {
    if (
      emptyValidation(
        'nameOnTheAccount',
        translations.ACCOUNT + ' ' + translations.NAME,
      )
    ) {
      if (data.nameOnTheAccount.trim().length < 2) {
        localErr.nameOnTheAccount = translations.ACCOUNT_NAME_ERR;
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };
  const scrollToErrorForUSA = () => {
    if (!emptyValidation('bankName', translations.BANK_NAME)) {
      moveToError(translations.CURRENCY);
    } else if (!isAccountNumberValid()) {
      moveToError(translations.ACCOUNT_NUMBER);
    } else if (!isConfirmAccountNumberValid()) {
      moveToError(translations.CONFIRM + ' ' + translations.ACCOUNT_NUMBER);
    } else if (!isNameOfAccount()) {
      moveToError(translations.NAME_ON_THE_ACCOUNT);
    } else if (
      !emptyValidation(
        'whereWouldYouLikeTransfer',
        translations.WHERE_WOULD_YOU_LIKE_TO_TRANSFER,
        false,
      )
    ) {
      moveToError(translations.WHERE_WOULD_YOU_LIKE_TO_TRANSFER);
    } else if (!routingErr() || !isT_Cchecked()) {
      moveToError(translations.ROUTING_NUMBER);
    }
  };
  const USAValidation = () => {
    emptyValidation('bankName', translations.BANK_NAME); //isbankNameValid();
    isAccountNumberValid();
    isConfirmAccountNumberValid();
    isNameOfAccount(); //isNameOfAccount();
    emptyValidation(
      'whereWouldYouLikeTransfer',
      translations.WHERE_WOULD_YOU_LIKE_TO_TRANSFER,
      false,
    );
    routingErr(); // isRoutingNumberValid();
    isT_Cchecked();

    setErr(localErr);

    return (
      emptyValidation('bankName', translations.BANK_NAME) &&
      isAccountNumberValid() &&
      isConfirmAccountNumberValid() &&
      isNameOfAccount() &&
      emptyValidation(
        'whereWouldYouLikeTransfer',
        translations.WHERE_WOULD_YOU_LIKE_TO_TRANSFER,
        false,
      ) &&
      routingErr() &&
      isT_Cchecked()
    );
  };
  const routingErr = () => {
    if (emptyValidation('routingNumber', translations.ROUTING_NUMBER)) {
      if (data.routingNumber.length < 2) {
        localErr.routingNumber = translations.ROUTING_NUMBER_ERR;
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };
  const scrollToErrorForOther = () => {
    if (!emptyValidation('currency', translations.CURRENCY)) {
      moveToError(translations.CURRENCY);
    } else if (!emptyValidation('country', translations.COUNTRY)) {
      moveToError(translations.WHAT_COUNTRY_ACCOUNT_LOCATED_IN);
    } else if (!isAccountNumberValid()) {
      moveToError(translations.ACCOUNT_NUMBER);
    } else if (!isConfirmAccountNumberValid()) {
      moveToError(translations.CONFIRM + ' ' + translations.ACCOUNT_NUMBER);
    } else if (!isNameOfAccount()) {
      moveToError(translations.NAME_ON_THE_ACCOUNT);
    } else if (
      !emptyValidation('address', translations.HOME + translations.ADDRESS)
    ) {
      moveToError(translations.ADDRESS);
    } else if (!emptyValidation('swiftCode', translations.SWIFT_CODE)) {
      moveToError(translations.SWIFT_CODE);
    }
  };
  const otherValidation = () => {
    emptyValidation('currency', translations.CURRENCY);
    emptyValidation('country', translations.COUNTRY);
    isAccountNumberValid();
    isConfirmAccountNumberValid();
    isNameOfAccount(); //isNameOfAccount();
    emptyValidation('address', translations.HOME + translations.ADDRESS);
    emptyValidation('swiftCode', translations.SWIFT_CODE);
    isT_Cchecked();
    setErr(localErr);

    return (
      emptyValidation('currency', translations.CURRENCY) &&
      emptyValidation('country', translations.COUNTRY) &&
      isAccountNumberValid() &&
      isConfirmAccountNumberValid() &&
      isNameOfAccount() && //isNameOfAccount();
      emptyValidation('address', translations.ADDRESS) &&
      emptyValidation('swiftCode', translations.SWIFT_CODE) &&
      isT_Cchecked()
    );
  };

  const isFormValid = () => {
    return selectedType == translations.USA
      ? USAValidation()
        ? USAValidation()
        : scrollToErrorForUSA()
      : otherValidation()
      ? otherValidation()
      : scrollToErrorForOther();
  };

  return isFormValid();
};

export const accountNumberValidation = (data, onChangeErr) => {
  if (!checkIsNull(data.accountNumber)) {
    onChangeErr({
      accountNumber: translations.ENTER + translations.YOUR + ' Account Number',
    });
    return false;
  } else if (data.accountNumber.length < 3) {
    onChangeErr({accountNumber: translations.ACCOUNT_NUMBER_ERR});
    return false;
  } else {
    onChangeErr({accountNumber: ''});
    return true;
  }
};
export const confirmAccountNumberValidation = (data, onChangeErr) => {
  if (!checkIsNull(data.confirmAccountNumber)) {
    onChangeErr({confirmAccountNumber: ''});

    return false;
  } else if (data.confirmAccountNumber != data.accountNumber) {
    onChangeErr({confirmAccountNumber: translations.ENTER_SAME_ACCOUNT_NUMBER});
    return false;
  } else {
    onChangeErr({confirmAccountNumber: ''});
    return true;
  }
};
