import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../../../../../common/header';
import translations from '../../../../../../../assets/translations';
import {styles} from './styles';
import FloatingInput from '../../../../../../common/floatinginput';
import {SCREEN} from '../../../../../../../root/screenname';
import CustomButton from '../../../../../../common/button';
import useCgMutation from '../../../../../../../services/api/useCgMutation';
import {PASSOWRD_RESET} from '../../../../../../../services/endpoints';
import {useSetLoader} from '../../../../../../../store/useAppStore';
import {useNavigation} from '@react-navigation/core';
import {Base} from '../../../../../../../services/models/base';
import {internetState} from '../../../../../../common/commonalert';
import {
  _validatePassword,
  removeEmojis,
} from '../../../../../../utils/validations';
import {useIsFocused} from '@react-navigation/native';
import {keyBoardManager} from '../../../../../../utils/helperFunction';
import {useNetInfo} from '@react-native-community/netinfo';

const ResetPassword = ({route}) => {
  const navigator = useNavigation();
  const [passwordError, setPasswordError] = useState(String);
  const [confirmPasswordError, setConfirmPasswordError] = useState(String);
  const [passwrod, setPasswrod] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordRef, setConfirmPasswordRef] = useState('');
  const setLoader = useSetLoader();
  const netInfo = useNetInfo();
  const [isPassword, setPaswordActive] = useState(true);
  const [isConfrimPassword, setConfirmPaswordActive] = useState(true);
  const isFocus = useIsFocused();
  useEffect(() => {
    keyBoardManager();
  }, []);
  useEffect(() => {
    if (isFocus) {
      setPasswrod('');
      setConfirmPassword('');
    }
  }, [isFocus]);

  //API handling----------------------------------------- START
  const changePasswordBody = {
    email: route.params.email,
    new_password: passwrod,
  };

  const {mutateAsync: passwrodResetRequest} = useCgMutation<Base>({
    key: PASSOWRD_RESET,
    body: changePasswordBody,
    url: PASSOWRD_RESET,
  });
  //API handling----------------------------------------- END

  /**
   * It checks if the user is connected to the internet, if the password is less than 8 characters, if
   * the password is valid, and if the password and confirm password match
   */
  const screenValidationMsg = (): boolean => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(true);
      return false;
    }

    if (passwrod.length < 8 || !_validatePassword(passwrod)) {
      setPasswordError(translations.PLEASE_ENTER_VALID_PASSWORD);
      return false;
    } else if (passwrod !== confirmPassword) {
      setPasswordError('');
      setConfirmPasswordError(translations.CONFIRM_PASSWORD_NOT_MATCH);
      return false;
    } else {
      setPasswordError('');
      setConfirmPasswordError('');
    }

    return true;
  };

  /**
   * A function that is called when the user clicks on the update button.
   */
  const _onUpdate = async () => {
    if (!screenValidationMsg()) {
      return;
    }
    setLoader(true);
    const otpVerificationResponse = await passwrodResetRequest();
    setLoader(false);
    if (otpVerificationResponse.success) {
      if (route.params.isLoggedIn) {
        navigator.navigate(SCREEN.HOME);
        return;
      }
      navigator.reset({
        index: 0,
        routes: [{name: SCREEN.LOGIN}],
      });
    }
  };

  /**
   * It sets the confirm password to the value of the input.
   */
  const handleConfirmPasswordChange = val => {
    setConfirmPassword(removeEmojis(val));
  };

  /**
   * It sets the password to the value of the input.
   */
  const handlePasswordChange = val => {
    setPasswrod(removeEmojis(val));
  };
  return (
    <SafeAreaView style={styles.continer}>
      <View>
        <Header
          lable={
            route.params.isLoggedIn
              ? translations.CHANGE_PASSWORD
              : translations.RESET_PASSWORD
          }
          isUnderLineRequired
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
          keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior={'position'}
            keyboardVerticalOffset={50}>
            <Text style={styles.enterEmailTExt}>
              {translations.PLEASE_ENTER_NEW_PASSWORD}
            </Text>
            <View style={styles.continerView}>
              <FloatingInput
                floatingText={translations.NEW_PASSWORD}
                value={passwrod}
                password={true}
                isMandatory={true}
                maxLength={100}
                errorMsg={passwordError}
                nextField={confirmPasswordRef}
                returnKeyType={'next'}
                autoCapitalize={'none'}
                isPassword={isPassword}
                onPasswordToglle={setPaswordActive}
                setText={handlePasswordChange}
              />
              <FloatingInput
                floatingText={translations.CONFIRM_PASSWORD}
                setRef={ref => setConfirmPasswordRef(ref)}
                password
                isPassword={isConfrimPassword}
                onPasswordToglle={setConfirmPaswordActive}
                returnKeyType={'done'}
                onDoneClick={_onUpdate}
                value={confirmPassword}
                autoCapitalize={'none'}
                setText={handleConfirmPasswordChange}
                errorMsg={confirmPasswordError}
                isMandatory
              />

              <View style={styles.loginContainer}>
                <CustomButton
                  inactive={
                    confirmPassword.length && passwrod.length ? true : false
                  }
                  label={
                    route.params.isLoggedIn
                      ? translations.UPDATE_PASSWORD
                      : translations.CHANGE_PASSWORD
                  }
                  onPress={
                    confirmPassword.length && passwrod.length ? _onUpdate : null
                  }
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default ResetPassword;
