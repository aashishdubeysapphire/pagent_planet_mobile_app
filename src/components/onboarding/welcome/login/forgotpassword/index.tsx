import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../../common/header';
import translations from '../../../../../assets/translations';
import images from '../../../../../assets/images/AppImages';
import {styles} from './styles';
import FloatingInput from '../../../../common/floatinginput';
import NextBotton from '../../../../common/nextbutton';
import {SCREEN} from '../../../../../root/screenname';
import {useSetLoader} from '../../../../../store/useAppStore';
import {FORGOT} from '../../../../../services/endpoints';
import useCgMutation from '../../../../../services/api/useCgMutation';
import {Auth} from '../../../../../services/models/auth';
import {useNavigation} from '@react-navigation/core';
import {internetState} from '../../../../common/commonalert';
import {_validateEmail, removeEmojis} from '../../../../utils/validations';
import {useNetInfo} from '@react-native-community/netinfo';
import {keyBoardManager} from '../../../../utils/helperFunction';
import {ApiStatusType} from '../../../../../services/constants';

/* This is a functional component. */
const ForgotPassword = () => {
  const navigator = useNavigation();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(String);
  const setLoader = useSetLoader();
  const netInfo = useNetInfo();
  const [isAllValid, setAllFieldValid] = useState(true);
  const sendOtpBody = {
    email: email.trim(),
  };

  /* A function that is called when the user presses the button. */
  useEffect(() => {
    keyBoardManager();
  }, []);

  const {mutateAsync: sendOtpRequest} = useCgMutation<Auth>({
    key: FORGOT,
    body: sendOtpBody,
    url: FORGOT,
  });

  /**
   * It checks if the user is connected to the internet, if not, it shows an error message. If the user
   * is connected to the internet, it checks if the email is valid, if not, it shows an error message
   * @returns A boolean value.
   */
  const screenValidationMsg = (): boolean => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    }

    if (!_validateEmail(email.trim())) {
      setEmailError(translations.PLEASE_ENTER_VALID_EMAIL);
      return false;
    } else {
      setEmailError('');
    }

    return true;
  };

  /**
   * A function that is called when the user presses the button.
   */
  const onPress = async () => {
    if (isAllValid || !screenValidationMsg()) {
      return;
    }
    setLoader(true);
    const resendResponse = await sendOtpRequest();

    if (
      resendResponse.success ||
      resendResponse.status_code === ApiStatusType.Error
    ) {
      navigator.navigate(SCREEN.OTP_VERIFICATION, {
        isForgot: true,
        email: email,
      });
    }
  };

  /**
   * If the email input field is empty, set the emailError state to an empty string and set the
   * allFieldValid state to true. If the email input field is not empty, set the emailError state to an
   * empty string and set the allFieldValid state to false
   */
  const emailInputChange = val => {
    setEmail(removeEmojis(val));
    setEmailError('');
    if (val.length > 0) {
      setAllFieldValid(false);
    } else {
      setAllFieldValid(true);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.continer}>
        <Header lable={translations.FORGOT_PASSWORD} isUnderLineRequired />
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
          keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior={'position'}
            keyboardVerticalOffset={50}>
            <images.Forgot.WomanStanding_ICON
              style={styles.womanstandingImage}
            />
            <Text style={styles.enterEmailTExt}>
              {translations.PLEASE_ENTER_REGISTERED_EMAIL_ADDRESS}
            </Text>
            <Text style={styles.sendinVerificationText} numberOfLines={2}>
              {translations.SENDING_AVERIFICATION_CODE}
            </Text>
            <View style={styles.textInputArea}>
              <FloatingInput
                floatingText={translations.EMAIL}
                setText={emailInputChange}
                isMandatory
                value={email}
                maxLength={250}
                errorMsg={emailError}
                returnKeyType={'done'}
                autoCapitalize={'none'}
                onDoneClick={onPress}
              />
              <View style={styles.nextbutton}>
                <NextBotton isInactive={isAllValid} onPress={onPress} />
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
