import NetInfo from '@react-native-community/netinfo';
import {Linking, Platform, Share, Vibration} from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';
import {color} from '../../assets/colorConstant';
import translations from '../../assets/translations';
import {User} from '../../services/models/user/user';
import {internetState, toast, toastType} from '../common/commonalert';
import {NavigationProp} from '@react-navigation/core';
import RNReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {Auth} from '../../services/models/auth';
import {
  DIRECTORY_ID,
  PRODUCT_STATUS,
  PRODUCT_STATUS_NAME,
  ROLES,
  SLUG,
  USER_DESHBOARD_TAB,
} from './enum';
import {checkIsNull, phoneValidation, removeEmojis} from './validations';
import {SCREEN} from '../../root/screenname';

export function randomString(len = 5) {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < len; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

export const onUnderDevlopment = () => {
  toast('Under Development', toastType.SUCESS_TOAST);
};

export const keyBoardManager = () => {
  if (isIosDevice()) {
    KeyboardManager.setEnable(true);
    KeyboardManager.setEnableDebugging(false);
    KeyboardManager.setKeyboardDistanceFromTextField(20);
    KeyboardManager.setShouldShowToolbarPlaceholder(false);
    KeyboardManager.setOverrideKeyboardAppearance(true);
    KeyboardManager.setShouldResignOnTouchOutside(true);
    KeyboardManager.setShouldPlayInputClicks(true);
    KeyboardManager.setToolbarPreviousNextButtonEnable(true);
  }
};
export const isIosDevice = () => {
  return Platform.OS === 'ios';
};
export const createFormData = (formValues: {[x: string]: any}) => {
  const form_data = new FormData();

  for (const key in formValues) {
    form_data.append(key, formValues[key]);
  }

  return form_data;
};

export const getIDsArrayFromArray = data => {
  const idArray: string[] = [];
  if (!!data) {
    data.map((i: {id: any}) => {
      idArray.push(String(i?.id));
    });
    return idArray; // will return in format ["1","2","3"]
  } else {
    return [];
  }
};
var internetStatus = true;
export const checkIsConnected = () => {
  NetInfo.fetch().then(state => {
    internetStatus = state.isConnected!!;
  });
  if (!internetStatus) {
    internetState(false);
  }
  return internetStatus;
};

export const ConTwoDecDigit = digit => {
  const regexSource = /^(\d*\.{0,1}\d{0,2}$)/;
  if (regexSource.test(digit)) {
    return digit;
  } else {
    return digit.slice(0, -1);
  }
};
export const onTabPress = (navigation, route) => {
  if (navigation?.isFocused?.()) {
    route?.params?.scrollToTop?.();
  }
};

export const trackScreenView = async screen => {
  const { default: analytics } = await import('@react-native-firebase/analytics');
    await analytics().logScreenView({ screen_name: screen, screen_class: screen });
};

export const scrollToTop = (navigation, ref) => {
  navigation.setParams({
    scrollToTop: () => ref?.current?.scrollToOffset(0, 0, true),
  });
};
export const dontAcceptEmoji = val => {
  return removeEmojis(val);
};

export const onShare = async (link: string, title: string) => {
  try {
    // throw new Error('Test Crashlytics JS crash');
    await Share.share({
      title: 'Pageant Planet',
      message: title + ' ' + link,
    });
  } catch (error) {
    //
  }
};
export const getValidValue = (value: string, isPlanActive: boolean) => {
  if (value === null || value === undefined || value.length === 0) {
    return value;
  }
  if (isPlanActive) {
    return value;
  } else {
    return hideSubString(value, value.substring(2, value.length));
  }
};

export const formatPhoneNumber = (nu: string) => {
  if (checkIsNull(nu)) {
    let formattedNumber;
    const {length} = nu;
    // Filter non numbers
    const regex = () => nu.replace(/[^0-9\.]+/g, '');
    // Set area code with parenthesis around it
    // const areaCode = () => `(${regex().slice(0, 3)})`;

    const areaCode = () => `${regex().slice(0, 3)}-`;

    // Set formatting for first six digits
    const firstSix = () => `${areaCode()} ${regex().slice(3, 6)}`;

    // Dynamic trail as user types
    const trailer = start => `${regex().slice(start, regex().length)}`;
    if (length < 3) {
      // First 3 digits
      formattedNumber = regex();
    } else if (length === 4) {
      // After area code
      formattedNumber = `${areaCode()} ${trailer(3)}`;
    } else if (length === 5) {
      // When deleting digits inside parenthesis
      formattedNumber = `${areaCode().replace(')', '')}`;
    } else if (length > 5 && length < 9) {
      // Before dash
      formattedNumber = `${areaCode()} ${trailer(3)}`;
    } else if (length < 10) {
      // After dash
      formattedNumber = `${firstSix()}-${trailer(6)}`;
    } else if (length >= 10) {
      // After dash
      formattedNumber = `${firstSix()}-${trailer(6)}`;
    }
    return formattedNumber?.replace(' ', '');
  } else {
    return nu;
  }
};

export const hideSubString = (value: string, pattern: string) => {
  let hideLength = '';
  let length = pattern.length;
  if (length > 10) {
    length = 10;
  }
  for (let index = 0; index < length; index++) {
    hideLength = hideLength + '*';
  }
  return value?.replace(pattern, hideLength);
};

export const openWebLink = (url: string) => {
  url = !url.includes('http') ? 'http://' + url : url;
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      if (!url.includes('http')) {
        Linking.openURL('http://' + url);
      } else {
        Linking.openURL(url);
      }
    } else if (!url.includes('http') || url.toLowerCase().startsWith('www')) {
      Linking.canOpenURL('http://' + url).then(supportedInnerCheck => {
        if (supportedInnerCheck) {
          Linking.openURL('http://' + url);
        } else {
          toast('Inavlid Link', toastType.ERROR_TOAST);
        }
      });
    }
  });
};
export const emptyFunction = () => {
  /* TODO document why this arrow function is empty */
};

export const openDialScreen = phone => {
  let number = '';

  if (phoneValidation(phone)) {
    if (isIosDevice()) {
      number = `telprompt:${phone}`;
    } else {
      number = `tel:${phone}`;
    }
    Linking.openURL(number);
  } else {
    toast(
      ' In' + translations.VALID + ' ' + translations.PHONE_NUMBER,
      toastType.ERROR_TOAST,
    );
  }
};

export const getText = (firstTitle: string, secoundTitle: string) => {
  if (
    firstTitle !== undefined &&
    firstTitle.length > 0 &&
    secoundTitle !== undefined &&
    secoundTitle.length > 0
  ) {
    return firstTitle + ', ' + secoundTitle;
  } else if (firstTitle !== undefined && firstTitle.length > 0) {
    return firstTitle;
  }
  return secoundTitle;
};

export const capitalizeFirstLowercaseRest = str => {
  var pieces = String(str).split(' ');
  for (var i = 0; i < pieces.length; i++) {
    var j = pieces[i].charAt(0).toUpperCase();
    pieces[i] = j + pieces[i].substr(1);
  }
  return pieces.join(' ');
};

export const dontAcceptSpecificSpecialChar = val => {
  return val;
};

export const getTagTypeLable = (
  roleId: number,
  final: string = ROLES.PAGEANT,
) => {
  switch (roleId) {
    case DIRECTORY_ID.CONTESTANT: {
      return ROLES.CONTESTANT;
    }
    case DIRECTORY_ID.AESTHETICS: {
      return ROLES.AESTHETICS;
    }
    case DIRECTORY_ID.COACH: {
      return ROLES.COACHE;
    }
    case DIRECTORY_ID.DESIGNER: {
      return ROLES.DESIGNER;
    }
    case DIRECTORY_ID.EMCEE: {
      return ROLES.EMCEE;
    }
    case DIRECTORY_ID.HAIR_AND_MAKEUP_ARTIST: {
      return ROLES.HAIR_MAKEUP_ARTIST;
    }
    case DIRECTORY_ID.JUDGE: {
      return ROLES.JUDGE;
    }
    case DIRECTORY_ID.PERSONAL_TRAINER: {
      return ROLES.PERSOANAL_TAINER;
    }
    case DIRECTORY_ID.PHOTOGRAPHER: {
      return ROLES.PHOTOGRAPHER;
    }
    case DIRECTORY_ID.PRODUCTION: {
      return ROLES.PRODUCTION;
    }
    case DIRECTORY_ID.RETAILER: {
      return ROLES.RETAILER;
    }
    default: {
      return final;
    }
  }
};
export const getSlugByRoleId = (
  roleId: number,
  final: string = SLUG.PAGEANT,
) => {
  switch (roleId) {
    case DIRECTORY_ID.CONTESTANT: {
      return SLUG.CONTESTANT;
    }
    case DIRECTORY_ID.AESTHETICS: {
      return SLUG.AESTHETICS;
    }
    case DIRECTORY_ID.COACH: {
      return SLUG.COACHE;
    }
    case DIRECTORY_ID.DESIGNER: {
      return SLUG.DESIGNER;
    }
    case DIRECTORY_ID.EMCEE: {
      return SLUG.EMCEE;
    }
    case DIRECTORY_ID.HAIR_AND_MAKEUP_ARTIST: {
      return SLUG.HAIR_MAKEUP_ARTIST;
    }
    case DIRECTORY_ID.JUDGE: {
      return SLUG.JUDGE;
    }
    case DIRECTORY_ID.PERSONAL_TRAINER: {
      return SLUG.PERSOANAL_TAINER;
    }
    case DIRECTORY_ID.PHOTOGRAPHER: {
      return SLUG.PHOTOGRAPHER;
    }
    case DIRECTORY_ID.PRODUCTION: {
      return SLUG.PRODUCTION;
    }
    case DIRECTORY_ID.RETAILER: {
      return SLUG.RETAILER;
    }
    default: {
      return final;
    }
  }
};

export const cc_expires_format = (string: string) => {
  return string
    .replace(
      /[^0-9]/g,
      '', // To allow only numbers
    )
    .replace(
      /^([2-9])$/g,
      '0$1', // To handle 3 > 03
    )
    .replace(
      /^(1{1})([3-9]{1})$/g,
      '0$1/$2', // 13 > 01/3
    )
    .replace(
      /^0{1,}/g,
      '0', // To handle 00 > 0
    )
    .replace(
      /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g,
      '$1/$2', // To handle 113 > 11/3
    );
};

export const cc_format = (value: string) => {
  const v = value
    .replace(/\s+/g, '')
    .replace(/[^0-9]/gi, '')
    .substr(0, 16);
  const parts = [];

  for (let i = 0; i < v.length; i += 4) {
    parts.push(v.substr(i, 4));
  }

  return parts.length > 1 ? parts.join(' ') : value;
};

export const getProductStatusColour = (status: number) => {
  switch (status) {
    case PRODUCT_STATUS.DELIVERED:
    case PRODUCT_STATUS.REFUNDED: {
      return color.UPCOMING;
    }
    case PRODUCT_STATUS.IN_PROCESS: {
      return color.RECENT;
    }
    case PRODUCT_STATUS.FAILED: {
      return color.RED;
    }
    case PRODUCT_STATUS.DISPUTED: {
      return color.P_PINK;
    }
    case PRODUCT_STATUS.SHIPPED: {
      return color.LIGHT_BLUE;
    }
    case PRODUCT_STATUS.RETURNED: {
      return color.YELLOW;
    }
    default: {
      return null;
    }
  }
};

export const getStatusTitle = (status: number) => {
  switch (status) {
    case PRODUCT_STATUS.IN_PROCESS: {
      return PRODUCT_STATUS_NAME.IN_PROCESS;
    }
    case PRODUCT_STATUS.SHIPPED: {
      return PRODUCT_STATUS_NAME.SHIPPED;
    }
    case PRODUCT_STATUS.DELIVERED: {
      return PRODUCT_STATUS_NAME.DELIVERED;
    }
    case PRODUCT_STATUS.DISPUTED: {
      return PRODUCT_STATUS_NAME.DISPUTED;
    }
    case PRODUCT_STATUS.RETURNED: {
      return PRODUCT_STATUS_NAME.RETURNED;
    }
    case PRODUCT_STATUS.REFUNDED: {
      return PRODUCT_STATUS_NAME.REFUNDED;
    }
    case PRODUCT_STATUS.FAILED: {
      return PRODUCT_STATUS_NAME.FAILED;
    }
    default: {
      return null;
    }
  }
};

export const getFileExtension = filename => {
  // get file extension
  const extension = filename.split('.').pop();
  return extension;
};

export const currencyFormatter = (price: string | number | bigint) => {
  // Format the price above to USD using the locale, style, and currency.
  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return USDollar.format(price);
};
export const isOnlyExpert = (user: User | undefined) => {
  return (
    (user?.primary_profile_type !== ROLES.PAGEANT &&
      user?.addedRolesListData === undefined) ||
    (user?.primary_profile_type !== ROLES.PAGEANT &&
      user?.addedRolesListData.pageant === undefined)
  );
};
export const readAbleJSON = data => {
  return JSON.stringify(data, null, 2);
};
export const hapticFeedBack = () => {
  let options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };
  isIosDevice()
    ? RNReactNativeHapticFeedback.trigger('impactMedium', options)
    : Vibration.vibrate(30);
};

/**
 * Pops when there is history; otherwise resets to the main app shell (cold links / single-route stack).
 */
export const goBackOrNavigateToDashboard = (
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  if (navigation.canGoBack()) {
    navigation.goBack();
    return;
  }
  let walker: NavigationProp<ReactNavigation.RootParamList> | undefined =
    navigation;
  for (let i = 0; i < 8 && walker; i++) {
    const parent = walker.getParent?.();
    if (parent?.canGoBack?.()) {
      parent.goBack();
      return;
    }
    walker = parent;
  }
  let root: NavigationProp<ReactNavigation.RootParamList> | undefined =
    navigation;
  while (root?.getParent?.()) {
    root = root.getParent();
  }
  root?.reset?.({
    index: 0,
    routes: [{name: SCREEN.DASHBOARD_NAVIGATION}],
  });
};

export const removeMiddleSpaces = (val = '') => {
  return val.split(' ').join('');
};
export const replaceSpaceWithUnderscore = (val = '') => {
  return val.split(' ').join('_').toLowerCase();
};
export const redirectWithToastMsg = (
  storeData: Auth,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  if (storeData?.data?.user?.is_pageant_exist) {
    /* The above code is displaying a toast message with a success toast type. The message is
    retrieved from the translations object using the key
    "PURCHASE_THE_MEMEBERSHIP_PLAN_FOR_PROFILE_TO_ACCESS_THE_FEATURE". After displaying the
    toast message, the code is resetting the navigation stack to the dashboard tab of the
    user's dashboard, with a parameter indicating that the user was redirected to the pageant
    role. */
    toast(
      translations.PURCHASE_THE_MEMEBERSHIP_PLAN_FOR_PROFILE_TO_ACCESS_THE_FEATURE,
      toastType.SUCESS_TOAST,
    );
    //Navigation to pagaent dashboard
    navigation.reset({
      index: 0,
      routes: [
        {
          name: USER_DESHBOARD_TAB.DESHBOARD,
          params: {redirectedto: ROLES.PAGEANT},
        },
      ],
    });
  } else if (storeData?.data?.user?.is_expert_exist) {
    toast(
      translations.PURCHASE_MEMBERSHIP_FROM_WEBSITE_TO_ACCESS_THE_FEATURE,
      toastType.SUCESS_TOAST,
    );
    //Navigation to Expert dashboard
    navigation.reset({
      index: 0,
      routes: [
        {
          name: USER_DESHBOARD_TAB.DESHBOARD,
          params: {redirectedto: ROLES.EXPERT},
        },
      ],
    });
  }
};

export const createFirebaseLog = async (
  fnxName: string,
  screenName: string,
  isScreen = true,
  value = '',
) => {
  const { default: crashlytics } = await import('@react-native-firebase/crashlytics');
  crashlytics().setAttribute(
    replaceSpaceWithUnderscore(
      screenName + (isScreen ? translations.SCREEN : translations.COMPONENT),
    ),
    !!value ? value + '_value' : fnxName + '_function',
  );
};
