import translations from '../../../../../../assets/translations';
import {ProductsData} from '../../../../../../services/models/sellitems/myProducts';
import {Category} from '../../../../../../services/models/sellitems/sellCategory';
import {SELL_PRODUCT, SUB_CATEGORY_VALUES} from '../../../../../utils/enum';
import {youTubeLinkValidation} from '../../../../../utils/validations';

export const isValid = (
  addEditRequest: ProductsData,
  OnChangeErr: {
    (val: any): void;
    (arg0: {
      profileType: string;
      profileName: string;
      productTitle: string;
      price: string;
      salePrice: string;
      inStock: string;
      minStock: string;
      pagentWhereThisItemWasWorn: string;
      videoLink: string;
      description: string;
      event: string;
    }): void;
  },
  category: Category | undefined,
  isFanUser: boolean
) => {
  let localValidationVar = {
    profileType: '',
    profileName: '',
    productTitle: '',
    price: '',
    salePrice: '',
    inStock: '',
    minStock: '',
    pagentWhereThisItemWasWorn: '',
    videoLink: '',
    description: '',
    event: '',
  };

  const isFieldValid = (fielddname, errorFeildname, minLength = 1) => {
    let val = !!addEditRequest[fielddname]
      ? String(addEditRequest[fielddname])
      : '';
    let trimed: string = val.trim();

    if (trimed.length < minLength || trimed == '.') {
      localValidationVar[errorFeildname] = translations.THIS_FIELD_REQUIRED;
      return false;
    } else {
      localValidationVar[errorFeildname] = '';
      return true;
    }
  };
  const numberValidation = (fielddname, errorFeildname) => {
    let num = !!addEditRequest[fielddname]
      ? Number(addEditRequest[fielddname]).toFixed(2)
      : '';
    if (num === '0.00' || isNaN(num)) {
      localValidationVar[errorFeildname] = translations.MUST_INC_ONE_VALUE;
      return false;
    } else {
      localValidationVar[errorFeildname] = '';
      return true;
    }
  };
  const priceValidation = () => {
    if (isFieldValid('price', 'price')) {
      return numberValidation('price', 'price');
    }
  };

  const isLinkValid = () => {
    if (!!addEditRequest.video_link) {
      if (youTubeLinkValidation(addEditRequest.video_link)) {
        localValidationVar.videoLink = '';
        return true;
      } else {
        localValidationVar.videoLink = translations.YOUTUBE_VALIDATION_ERR;
        return false;
      }
    } else {
      return true;
    }
  };
  const isCategorySelected = () => {
    if (!!addEditRequest?.subcategory?.values?.id) {
      localValidationVar.selectCategory = '';
      return true;
    } else {
      localValidationVar.selectCategory = translations.THIS_FIELD_REQUIRED;
      return false;
    }
  };
  const checkValidEvent = () => {
    if (!!addEditRequest.event_name) {
      localValidationVar.event = '';
      return true;
    } else {
      localValidationVar.event = translations.THIS_FIELD_REQUIRED;
      return false;
    }
  };

  const twoStepValidation = () => {
    if (
      category?.id == SELL_PRODUCT.BEAUTY ||
      category?.id == SELL_PRODUCT.DIGITAL_PAINT ||
      category?.id == SELL_PRODUCT.HIRE ||
      category?.id == SELL_PRODUCT.TICKETS_ENTRY
    ) {
      if (isCategorySelected()) {
        if (
          addEditRequest?.subcategory?.values?.name ==
            SUB_CATEGORY_VALUES.ENTRY_FEE ||
          addEditRequest?.subcategory?.values?.name == SUB_CATEGORY_VALUES.EVENT
        ) {
          return checkValidEvent();
        } else {
          return true;
        }
      } else {
        return false;
      }
    } else {
      return true;
    }
  };
  const notFanValidation = () => {
    return (
      isFieldValid('role_name', 'profileType') &&
      isFieldValid('profile_name', 'profileName') &&
      twoStepValidation()
    );
  };
  const productTitleValidation = () => {
    if (
      addEditRequest?.unique_style_number?.trim().length == 0 ||
      addEditRequest?.unique_style_number?.trim() == undefined
    ) {
      localValidationVar.productTitle = translations.THIS_FIELD_REQUIRED;
      return false;
    } else if (addEditRequest?.unique_style_number?.trim().length == 1) {
      localValidationVar.productTitle = translations.ENTER_ATLEAST_TWO_CHARS;
      return false;
    } else if (addEditRequest?.unique_style_number?.trim().length >= 2) {
      localValidationVar.productTitle = '';
      return true;
    }
  };
  const isFormValid = () => {
    productTitleValidation();
    isFieldValid('role_name', 'profileType');
    isFieldValid('profile_name', 'profileName');
    isFieldValid('price', 'price');
    priceValidation();
    numberValidation('selling_price', 'salePrice');
    // numberValidation('selling_price', 'salePrice');
    numberValidation('inventory', 'inStock');
    numberValidation('inventory_alert', 'minStock');
    isLinkValid();
    isFieldValid('category_id', 'selectCategory');
    isCategorySelected();
    checkValidEvent();
    OnChangeErr(localValidationVar);
    if (
      productTitleValidation() &&
      isFieldValid('price', 'price') &&
      priceValidation() &&
      numberValidation('selling_price', 'salePrice') &&
      numberValidation('inventory', 'inStock') &&
      numberValidation('inventory_alert', 'minStock') &&
      isLinkValid()
    ) {
      if (isFanUser) {
        return true;
      } else {
        return notFanValidation();
      }
    }
  };
  return isFormValid();
};
