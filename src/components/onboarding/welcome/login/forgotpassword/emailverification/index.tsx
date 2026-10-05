import {View, Text, SafeAreaView, ScrollView, Platform} from 'react-native';
import React, {useRef, useContext, useEffect, useState} from 'react';
import OTPTextView from 'react-native-otp-textinput';
import Header from '../../../../../common/header';
import translations from '../../../../../../assets/translations';
import {styles} from './styles';
import {SCREEN} from '../../../../../../root/screenname';
import {color} from '../../../../../../assets/colorConstant';
import CustomButton from '../../../../../common/button';
import {useNavigation} from '@react-navigation/core';
import {
  RESEND_OTP,
  OTP_VERIFICATION,
} from '../../../../../../services/endpoints';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import {Base} from '../../../../../../services/models/base';
import {Auth} from '../../../../../../services/models/auth';
import {UserContext} from '../../../../../../store/userStore';
import {useSetLoader} from '../../../../../../store/useAppStore';
import {
  toast,
  toastType,
  internetState,
} from '../../../../../common/commonalert';
import {useNetInfo} from '@react-native-community/netinfo';
import {keyBoardManager} from '../../../../../utils/helperFunction';
import DeviceInfo from 'react-native-device-info';

const EmailVerification = ({route}) => {
  const navigator = useNavigation();
  const otpInput = useRef(null);
  const timerRef = useRef(null);

  const [otp, setOtp] = useState('');
  const [showResendCodeoption, setShowResendCodeoption] = useState(false);
  const [isSubmitbuttonActive, setIsSubmitbuttonActive] = useState(false);
  const [pushNotificationToken, setPushNotificationToken] = useState('');
  const [globleTimer, setGlobleTimer] = useState(180);

  const {setDataToStore} = useContext(UserContext);
  const setLoader = useSetLoader();
  const netInfo = useNetInfo();

  /* -------------------- API BODIES -------------------- */
  const otpVerificationBody = {
    email: route.params.email,
    otp: otp,
    login: route.params.isForgot === undefined ? 1 : 0,
    fcm_token: pushNotificationToken,
    device_type: Platform.OS,
    device_manufacturer: DeviceInfo.getModel(),
    app_version: DeviceInfo.getVersion(),
    gmt_offset: new Date().getTimezoneOffset(),
  };

  const otpVerificationBodya = {
    email: route.params.email,
  };

  const {mutateAsync: otpVerificationRequest} = useCgMutation<Auth>({
    key: OTP_VERIFICATION,
    body: otpVerificationBody,
    url: OTP_VERIFICATION,
  });

  const {mutateAsync: otpResendRequest} = useCgMutation<Base>({
    key: RESEND_OTP,
    body: otpVerificationBodya,
    url: RESEND_OTP,
    offSuccessToast: true,
  });

  /* -------------------- FCM TOKEN -------------------- */
  const getPushNotificationToken = async () => {
    try {
      const {default: messaging} = await import(
        '@react-native-firebase/messaging'
      );

      if (Platform.OS === 'ios') {
        await messaging().registerDeviceForRemoteMessages();
      }

      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      setPushNotificationToken(token);
    } catch (e) {
      console.log('FCM token error:', e);
    }
  };

  /* -------------------- INITIAL EFFECT -------------------- */
  useEffect(() => {
    keyBoardManager();
    getPushNotificationToken();
    startTimer();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  /* -------------------- TIMER LOGIC -------------------- */
  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setGlobleTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setShowResendCodeoption(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const getTimer = seconds => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  /* -------------------- OTP HANDLERS -------------------- */
  const onChangeOtp = text => {
    setOtp(text);
    console.log(text.length, 'dsdsd');

    setIsSubmitbuttonActive(text.length === 6);
  };

  const _onPressSubmitButton = async () => {
    if (!isSubmitbuttonActive) return;

    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return;
    }

    setLoader(true);
    const response = await otpVerificationRequest();
    setLoader(false);

    if (response.success) {
      if (route?.params?.inactive) {
        setDataToStore(response);
        toast(response.message, toastType.SUCESS_TOAST);
      } else {
        navigator.reset({
          index: 0,
          routes: [
            {name: SCREEN.WELCOME},
            {
              name: SCREEN.PASSWORD_RESET,
              params: {email: route.params.email},
            },
          ],
        });
      }
    }
  };

  const _onPressResendOtp = async () => {
    if (!netInfo.isConnected && netInfo.isInternetReachable) {
      internetState(true);
      return;
    }

    setLoader(true);
    const response = await otpResendRequest();
    setLoader(false);

    if (response.success) {
      otpInput.current.clear();
      setShowResendCodeoption(false);
      setGlobleTimer(180);
      startTimer();
    }
  };

  /* -------------------- UI -------------------- */
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.continer}>
        <Header lable={translations.VERIFICATION} isUnderLineRequired />

        <ScrollView keyboardShouldPersistTaps="handled">
          <Text style={styles.enterEmailText}>
            {translations.PLEASE_ENTER_VERIFICATION_CODE}
          </Text>

          <Text style={styles.sendinVerificationText}>
            {translations.SENT_6_DIGIT_CODE_TO_EMAIL}{' '}
            <Text style={styles.emailID}>{route?.params?.email}</Text>
          </Text>

          <View style={styles.optView}>
            <OTPTextView
              ref={e => (otpInput.current = e)}
              textInputStyle={styles.roundedTextInput}
              handleTextChange={onChangeOtp}
              inputCount={6}
              tintColor={color.P_PINK}
              keyboardType="numeric"
              returnKeyType="done"
              onSubmitEditing={_onPressSubmitButton}
            />
          </View>

          {showResendCodeoption ? (
            <Text style={styles.resendCode} onPress={_onPressResendOtp}>
              {translations.RESEND_CODE}
            </Text>
          ) : (
            <Text style={styles.timer}>
              {translations.RESEND_CODE} {translations.IN}{' '}
              {getTimer(globleTimer)}
            </Text>
          )}

          <View style={styles.sumbitButtonStyle}>
            <CustomButton
              label={translations.SUBMIT}
              inactive={isSubmitbuttonActive}
              onPress={_onPressSubmitButton}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EmailVerification;
