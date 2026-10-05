import React, {useState, useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/core';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Platform,
} from 'react-native';
import FloatingInput from '../../../common/floatinginput';
import useStyle from './useStyle';
import CustomButton from '../../../common/button';
import Logo from '../../../common/logo';
import translations from '../../../../assets/translations';
import useDynamicWidth from '../../../utils/useDynamicWidth';
import {SCREEN} from '../../../../root/screenname';
import useCgMutation from '../../../../services/api/useCgMutation';
import {REGISTER} from '../../../../services/endpoints';
import {Auth} from '../../../../services/models/auth';
import {ApiStatusType} from '../../../../services/constants';
import DeviceInfo from 'react-native-device-info';
import images from '../../../../assets/images/AppImages';

import {
  useAddResultModalVisible,
  useSetImagePasteToast,
  useSetLoader,
} from '../../../../store/useAppStore';
import {useNetInfo} from '@react-native-community/netinfo';
import {internetState} from '../../../common/commonalert';
import {
  _validateEmail,
  _validatePassword,
  removeEmojis,
} from '../../../utils/validations';
import {
  createFirebaseLog,
  isIosDevice,
  keyBoardManager,
  trackScreenView,
} from '../../../utils/helperFunction';
import {RootContext} from '../../../../store/rootStore';
import {ANALYTICS_SCREEN} from '../../../../assets/translations/analyticsscreenname';
import {moderateScaleVertical} from '../../../utils/responsiveSize';
import KeyboardManager from 'react-native-keyboard-manager';
const SignUp = () => {
  const styles = useStyle();

  const dW = useDynamicWidth();
  const setLoader = useSetLoader();
  const [isAllValid, setAllFieldValid] = useState(false);
  const [emailError, setEmailError] = useState(String);
  const [passwordError, setPasswordError] = useState(String);
  const navigator = useNavigation();
  const [isSelected, setSelection] = useState(true);
  const netInfo = useNetInfo();
  const setMoveImageToast = useSetImagePasteToast();
  const [lastNameRef, setLastNameRef] = React.useState('');
  const [emailRef, setEmailRef] = React.useState('');
  const [passwordRef, setPasswordRef] = React.useState('');
  const [isPassword, setPaswordActive] = React.useState(true);
  const {setWelcomePopViewed} = useContext(RootContext);
  const setAddResultModalVisible = useAddResultModalVisible();

  /* A state variable. */
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  //API handling-----------------------------------------
  const signUpRequestBody = {
    first_name: data.firstname.trim(),
    last_name: data.lastname.trim(),
    email: data.email.trim(),
    password: data.password.trim(),
    fcm_token: '',
    device_type: Platform.OS,
    device_manufacturer: DeviceInfo.getModel(),
    app_version: DeviceInfo.getVersion(),
    gmt_offset: 'gmt_offset',
  };

  /* A custom hook which is used to make api call. */
  const {mutateAsync: signUpRequest} = useCgMutation<Auth>({
    key: REGISTER,
    body: signUpRequestBody,
    url: REGISTER,
    disableLoader: true,
  });

  //API handling-----------------------------------------
  //Screen Navigation-----------------------------------------

  /**
   * OnLoginPress is a function that navigates to the login screen.
   */

  const onLoginPress = () => {
    createFirebaseLog(onLoginPress.name, SCREEN.SIGNUP);
    navigator.replace(SCREEN.LOGIN);
  };

  /**
   * OnTermConditionPress is a function that navigates to a static page with a title of TERMS_OF_SERVIC
   */
  const onTermConditionPress = () => {
    createFirebaseLog(onTermConditionPress.name, SCREEN.SIGNUP);
    navigator.navigate(SCREEN.STATIC_PAGE, {
      title: translations.TERMS_OF_SERVIC,
    });
  };

  //Screen Navigation-----------------------------------------

  /* A custom hook which is used to manage keyboard. */
  useEffect(() => {
    keyBoardManager();
    if (isIosDevice()) {
      KeyboardManager.setKeyboardDistanceFromTextField(5);
    }
    resetCount();
    trackScreenView(ANALYTICS_SCREEN.SIGNUP);

    return () => {
      if (isIosDevice()) {
        KeyboardManager.setKeyboardDistanceFromTextField(20);
      }
    };
  }, []);

  const resetCount = () => {
    createFirebaseLog(resetCount.name, SCREEN.SIGNUP);
    setTimeout(() => {
      setTimeout(() => {
        setMoveImageToast(0);
      }, 1000);
    }, 1000);
  };
  /**
   * When the first name input changes, update the first name in the data object, and then check the
   * screen validation.
   */
  const firstNameInputChange = val => {
    createFirebaseLog(firstNameInputChange.name, SCREEN.SIGNUP);
    setData({
      ...data,
      firstname: removeEmojis(val),
    });
    checkScreenVAlidation(
      removeEmojis(val),
      data.lastname,
      data.email,
      data.password,
      isSelected,
    );
  };

  /**
   * LastNameInputChange is a function that takes a value, sets the lastname property of the data object
   * to the value, and calls the checkScreenValidation function with the firstname, lastname, email,
   * password, and isSelected properties of the data object.
   */
  const lastNameInputChange = val => {
    createFirebaseLog(lastNameInputChange.name, SCREEN.SIGNUP);
    setData({
      ...data,
      lastname: removeEmojis(val),
    });
    checkScreenVAlidation(
      data.firstname,
      removeEmojis(val),
      data.email,
      data.password,
      isSelected,
    );
  };

  /**
   * When the email input changes, update the data object with the new value, clear the email error, and
   * check the screen validation.
   */
  const emailInputChange = val => {
    createFirebaseLog(emailInputChange.name, SCREEN.SIGNUP);
    setData({
      ...data,
      email: removeEmojis(val),
    });
    setEmailError('');
    checkScreenVAlidation(
      data.firstname,
      data.lastname,
      removeEmojis(val),
      data.password,
      isSelected,
    );
  };

  /**
   * When the password input changes, update the data object with the new password value, clear the
   * password error, and check the screen validation.
   */
  const passwordInputChange = val => {
    createFirebaseLog(passwordInputChange.name, SCREEN.SIGNUP);
    setData({
      ...data,
      password: removeEmojis(val),
    });
    setPasswordError('');
    checkScreenVAlidation(
      data.firstname,
      data.lastname,
      data.email,
      removeEmojis(val),
      isSelected,
    );
  };

  /**
   * If the length of the firstName, lastName, email, or password is 0, then setAllFieldValid to false,
   * otherwise setAllFieldValid to termConsitionState.
   * @param {String} firstName - String,
   * @param {String} lastName - String,
   * @param {String} email - String,
   * @param {String} password - String,
   * @param {boolean} termConsitionState - boolean,
   * @returns Nothing.
   */
  const checkScreenVAlidation = (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    termConsitionState: boolean,
  ) => {
    createFirebaseLog(checkScreenVAlidation.name, SCREEN.SIGNUP);
    if (
      firstName?.length === 0 ||
      lastName?.length === 0 ||
      email?.length === 0 ||
      password?.length === 0
    ) {
      setAllFieldValid(false);
      return;
    }
    setAllFieldValid(termConsitionState);
  };

  /**
   * If the user is not connected to the internet, show an error message. If the user's email is not
   * valid, show an error message. If the user's password is not valid, show an error message. If all
   * of the above are true, return true.
   * @returns A function that returns a boolean.
   */
  const screenValidationMsg = (): boolean => {
    createFirebaseLog(screenValidationMsg.name, SCREEN.SIGNUP);
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    }

    if (!_validateEmail(data.email)) {
      setEmailError(translations.PLEASE_ENTER_VALID_EMAIL);
      return false;
    } else {
      setEmailError('');
    }

    if (data.password?.length < 8 || !_validatePassword(data.password)) {
      setPasswordError(translations.PLEASE_ENTER_VALID_PASSWORD);
      return false;
    } else {
      setPasswordError('');
    }

    return true;
  };

  /**
   * OnSignupClick() is a function that is called when the user clicks on the signup button.
   *
   * The function checks if the user has entered all the required fields and if the user has entered
   * all the required fields, it calls the signUpRequest() function.
   *
   */
  const onSignupClick = async () => {
    createFirebaseLog(onSignupClick.name, SCREEN.SIGNUP);
    if (!isAllValid || !screenValidationMsg()) {
      return;
    }

    setLoader(true);
    const response = await signUpRequest();

    if (response.success || response.status_code === ApiStatusType.Error) {
      setWelcomePopViewed(true);

      setTimeout(() => {
        navigator.reset({
          index: 0,
          routes: [
            {name: SCREEN.WELCOME},
            {name: SCREEN.SIGNUP},
            {
              name: SCREEN.OTP_VERIFICATION,
              params: {
                inactive: true,
                email: data.email,
              },
            },
          ],
        });
      }, 300);
      setTimeout(() => {
        setLoader(false);
      }, 200);
      setAddResultModalVisible(true);
    } else {
      setLoader(false);
    }
  };

  /**
   * OnTermConditionUpdate is a function that sets the selection to the opposite of isSelected and then
   * calls checkScreenVAlidation with the data.firstname, data.lastname, data.email, data.password, and
   * the opposite of isSelected.
   */
  const onTermConditionUpdate = () => {
    createFirebaseLog(onTermConditionUpdate.name, SCREEN.SIGNUP);
    setSelection(!isSelected);
    checkScreenVAlidation(
      data.firstname,
      data.lastname,
      data.email,
      data.password,
      !isSelected,
    );
  };

  const onGuestUserPress = () => {
    createFirebaseLog(onGuestUserPress.name, SCREEN.SIGNUP);
    navigator.navigate(SCREEN.SHOP);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: moderateScaleVertical(8),
      }}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag">
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.skipContainer}
          onPress={onGuestUserPress}>
          <Text style={styles.skip}>{translations.SKIP_BUTTON}</Text>
        </TouchableOpacity>
        <Logo width={dW(140)} height={dW(140)} />
        <View style={styles.divider} />

        <FloatingInput
          floatingText={translations.FIRST_NAME}
          value={data.firstname}
          nextField={lastNameRef}
          returnKeyType={'next'}
          isMandatory={true}
          maxLength={100}
          setText={firstNameInputChange}
        />

        <FloatingInput
          floatingText={translations.LAST_NAME}
          value={data.lastname}
          returnKeyType={'next'}
          isMandatory={true}
          setRef={ref => setLastNameRef(ref)}
          nextField={emailRef}
          maxLength={100}
          setText={lastNameInputChange}
        />

        <FloatingInput
          floatingText={translations.EMAIL}
          value={data.email}
          returnKeyType={'next'}
          errorMsg={emailError}
          isMandatory={true}
          maxLength={250}
          setRef={ref => setEmailRef(ref)}
          nextField={passwordRef}
          keyboardType={'email-address'}
          setText={emailInputChange}
          autoCapitalize={'none'}
        />

        <FloatingInput
          floatingText={translations.PASSWORD}
          value={data.password}
          errorMsg={passwordError}
          isMandatory={true}
          setRef={ref => setPasswordRef(ref)}
          returnKeyType={'done'}
          password
          isPassword={isPassword}
          autoCapitalize={'none'}
          onPasswordToglle={setPaswordActive}
          maxLength={100}
          onDoneClick={onSignupClick}
          setText={passwordInputChange}
        />

        <View style={styles.agreeContainer}>
          <Pressable onPress={onTermConditionUpdate}>
            {isSelected ? (
              <images.Common.Filled_ICON />
            ) : (
              <images.Common.UnFilled_ICON />
            )}
          </Pressable>

          <Text style={styles.agreeText}>{translations.AGREE_TO}</Text>
          <Text style={styles.dontHaveAc} onPress={onTermConditionPress}>
            {translations.TERMS_OF_SERVIC}
          </Text>
        </View>

        <CustomButton
          inactive={isAllValid}
          label={translations.SINGUP}
          onPress={onSignupClick}
        />

        <View style={styles.row}>
          <Text style={styles.agreeText}>
            {translations.ALREADY_HAVE_ACCOUNT}{' '}
          </Text>
          <Pressable onPress={onLoginPress}>
            <Text style={styles.link}>{translations.LOGIN}</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
