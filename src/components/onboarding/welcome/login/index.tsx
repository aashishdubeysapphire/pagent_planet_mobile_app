import React, {useContext, useEffect, useState} from 'react';
import {
  Pressable,
  TouchableOpacity,
  Text,
  View,
  Platform,
  ScrollView,
} from 'react-native';
import useStyle from './useStyle';
import {useNavigation} from '@react-navigation/core';
import translations from '../../../../assets/translations';
import Logo from '../../../common/logo';
import useDynamicWidth from '../../../utils/useDynamicWidth';
import CustomButton from '../../../common/button';
import FloatingInput from '../../../common/floatinginput';
import {Auth} from '../../../../services/models/auth';
import {LOGIN, PUBLIC_AUTH} from '../../../../services/endpoints';
import useCgMutation from '../../../../services/api/useCgMutation';
import {UserContext} from '../../../../store/userStore';
import DeviceInfo from 'react-native-device-info';
import {SCREEN} from '../../../../root/screenname';
// Removed: import messaging from '@react-native-firebase/messaging';
import {toast, toastType, internetState} from '../../../common/commonalert';
import {
  useSetImagePasteToast,
  useSetLoader,
} from '../../../../store/useAppStore';
import {useNetInfo} from '@react-native-community/netinfo';
import {ApiStatusType} from '../../../../services/constants';
import {
  createFirebaseLog,
  keyBoardManager,
  trackScreenView,
} from '../../../utils/helperFunction';
import {RootContext} from '../../../../store/rootStore';
import {removeEmojis} from '../../../utils/validations';
import Config from 'react-native-config';
import {ANALYTICS_SCREEN} from '../../../../assets/translations/analyticsscreenname';

const Login = () => {
  const styles = useStyle();

  const setLoader = useSetLoader();
  const {setDataToStore} = useContext(UserContext);
  const [passwordRef, setPasswordRef] = React.useState('');
  const dW = useDynamicWidth();
  const {setWelcomePopViewed} = useContext(RootContext);
  const navigation = useNavigation().navigate;
  const navigator = useNavigation();
  const [emailFocus] = useState(false);
  const [isAllValid, setAllFieldValid] = useState(false);
  const [pushNotificationToken, setPushNotificationToken] = useState('');
  const netInfo = useNetInfo();
  const [isPassword, setPaswordActive] = React.useState(true);
  const [passwordError, setPasswordError] = useState(String);
  const setMoveImageToast = useSetImagePasteToast();

  const {mutateAsync: publicTokenRequest} = useCgMutation<Auth>({
    key: PUBLIC_AUTH,
    body: {
      grant_type: Config.GRANT_TYPE,
      client_id: Config.CLIENT_ID,
      client_secret: Config.CLIENT_SECRET,
    },
    url: PUBLIC_AUTH,
    offSuccessToast: true,
  });

  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const loginBody = {
    user_name: data.username.trim(),
    password: data.password.trim(),
    fcm_token: pushNotificationToken,
    device_type: Platform.OS,
    device_manufacturer: DeviceInfo.getModel(),
    app_version: DeviceInfo.getVersion(),
    gmt_offset: new Date().getTimezoneOffset(),
  };

  const {mutateAsync: loginUser} = useCgMutation<Auth>({
    key: LOGIN,
    body: loginBody,
    url: LOGIN,
    offSuccessToast: true,
    disableLoader: true,
  });

  useEffect(() => {
    keyBoardManager();
    getPushNotificationToken();
    resetCount();
    trackScreenView(ANALYTICS_SCREEN.LOGIN);
  }, []);

  // Now safely deferred with dynamic import
  const getPushNotificationToken = async () => {
    createFirebaseLog(getPushNotificationToken.name, SCREEN.LOGIN);
    try {
      const {default: messaging} = await import(
        '@react-native-firebase/messaging'
      );

      if (Platform.OS === 'android' && Platform.Version >= 33) {
        console.log('Requesting notification permission for Android 13+');
        const {PermissionsAndroid} = require('react-native');
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      }

      // Register the device with FCM (iOS only)
      if (Platform.OS === 'ios') {
        await messaging().registerDeviceForRemoteMessages();
      }

      // Get the token
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      setPushNotificationToken(token);
    } catch (error) {
      console.log('Failed to get FCM token:', error);
      // Optionally handle error (e.g., set empty token)
      setPushNotificationToken('');
    }
  };

  // ... rest of your functions unchanged (textInputChange, handlePasswordChange, etc.)

  const textInputChange = val => {
    createFirebaseLog(textInputChange.name, SCREEN.LOGIN);
    setData({
      ...data,
      username: removeEmojis(val),
    });
    checkScreenValidation(val, data.password);
  };

  const handlePasswordChange = val => {
    createFirebaseLog(handlePasswordChange.name, SCREEN.LOGIN);
    setData({
      ...data,
      password: removeEmojis(val),
    });
    checkScreenValidation(data.username, val);
  };

  const checkScreenValidation = (firstName: string, password: string) => {
    createFirebaseLog(checkScreenValidation.name, SCREEN.LOGIN);
    if (firstName.length === 0 || password.length === 0) {
      setAllFieldValid(false);
      return;
    }
    setAllFieldValid(true);
  };

  const onForgotPress = () => {
    createFirebaseLog(onForgotPress.name, SCREEN.LOGIN);
    navigation(SCREEN.FORGOT);
  };

  const onSignUpPress = () => {
    createFirebaseLog(onSignUpPress.name, SCREEN.LOGIN);
    navigator.replace(SCREEN.SIGNUP);
  };

  const screenValidationMsg = (): boolean => {
    createFirebaseLog(screenValidationMsg.name, SCREEN.LOGIN);
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    }
    setPasswordError('');
    return true;
  };

  const resetCount = () => {
    createFirebaseLog(resetCount.name, SCREEN.LOGIN);
    setTimeout(() => {
      setTimeout(() => {
        setMoveImageToast(0);
      }, 1000);
    }, 1000);
  };

  const getPublicToken = async () => {
    createFirebaseLog(getPublicToken.name, SCREEN.LOGIN);
    resetCount();
    setLoader(true);
    const response = await publicTokenRequest();
    setLoader(false);
    setDataToStore(response);
  };

  const onLoginPress = async () => {
    try {
      createFirebaseLog(onLoginPress.name, SCREEN.LOGIN);
      if (!isAllValid || !screenValidationMsg()) {
        return false;
      }

      setWelcomePopViewed(false);
      setLoader(true);
      const response = await loginUser();

      if (response.success || response.status_code === ApiStatusType.Error) {
        if (response.data?.user.status) {
          toast(response.message, toastType.SUCESS_TOAST);
          setDataToStore(response);
          setTimeout(() => {
            setLoader(false);
          }, 300);
        } else if (response.status_code === ApiStatusType.Error) {
          setLoader(false);
          setTimeout(() => {
            setWelcomePopViewed(true);
            navigator.reset({
              index: 0,
              routes: [
                {name: SCREEN.WELCOME},
                {name: SCREEN.LOGIN},
                {
                  name: SCREEN.OTP_VERIFICATION,
                  params: {
                    inactive: true,
                    email: data.username,
                  },
                },
              ],
            });
          }, 500);
        } else {
          setLoader(false);
        }
      } else {
        getPublicToken();
        setLoader(false);
      }
    } catch (err) {
      console.log('Error =>', err);
    }
  };

  const onGuestUserPress = () => {
    createFirebaseLog(onGuestUserPress.name, SCREEN.LOGIN);
    navigator.navigate(SCREEN.SHOP);
  };
  console.log('FCM Token in Login Screen:', pushNotificationToken); // Debug log for FCM token
  // JSX remains completely unchanged
  return (
    <ScrollView
      keyboardShouldPersistTaps={'handled'}
      contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.skipContainer}
          onPress={onGuestUserPress}>
          <Text style={styles.skip}>{translations.SKIP_BUTTON}</Text>
        </TouchableOpacity>
        <Logo width={dW(185)} height={dW(185)} />
        {/* <Text selectable numberOfLines={4}>
          {pushNotificationToken}
        </Text> */}
        <View style={styles.divider} />

        <FloatingInput
          floatingText={translations.EMAIL_USERNAME}
          value={data.username}
          focus={emailFocus}
          isMandatory={true}
          maxLength={250}
          nextField={passwordRef}
          returnKeyType={'next'}
          autoCapitalize={'none'}
          setText={textInputChange}
        />

        <FloatingInput
          floatingText={translations.PASSWORD}
          value={data.password}
          password={true}
          isMandatory={true}
          maxLength={100}
          errorMsg={passwordError}
          returnKeyType={'done'}
          autoCapitalize={'none'}
          isPassword={isPassword}
          onPasswordToglle={setPaswordActive}
          setRef={ref => setPasswordRef(ref)}
          onDoneClick={onLoginPress}
          setText={handlePasswordChange}
        />

        <View style={styles.forgotPassword}>
          <Pressable onPress={onForgotPress}>
            <Text style={styles.skip}>
              {translations.FORGOT_PASSWORD + '?'}
            </Text>
          </Pressable>
        </View>

        <CustomButton
          inactive={isAllValid}
          label={translations.LOGIN}
          onPress={onLoginPress}
        />

        <View style={styles.row}>
          <Text style={styles.newLabel}>
            {translations.NEW_TO_PAGEANT_PLANET}{' '}
          </Text>
          <Pressable onPress={onSignUpPress}>
            <Text style={styles.link}>{translations.SING_UP}</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
