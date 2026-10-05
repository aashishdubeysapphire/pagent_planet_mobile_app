import React, {useContext, useEffect, useState} from 'react';
import CustomButton from '../../common/button';
import Logo from '../../common/logo';
import {useNavigation} from '@react-navigation/core';
import useStyle from './useStyle';
import {Text, TouchableOpacity, View} from 'react-native';
import translations from '../../../assets/translations';
import {SCREEN} from '../../../root/screenname';
import useDynamicWidth from '../../utils/useDynamicWidth';
import {Auth} from '../../../services/models/auth';
import {PUBLIC_AUTH} from '../../../services/endpoints';
import {useSetLoader} from '../../../store/useAppStore';
import {UserContext} from '../../../store/userStore';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import {internetState, toastType, toast} from '../../common/commonalert';
import useCgMutation from '../../../services/api/useCgMutation';
import Config from 'react-native-config';
import {createFirebaseLog} from '../../utils/helperFunction';
import {width} from '../../utils/responsiveSize';
const Welcome = () => {
  const styles = useStyle();
  console.log('this is env', Config);
  const dW = useDynamicWidth();
  const navigator = useNavigation();
  const setLoader = useSetLoader();
  const {storeData, setDataToStore} = useContext(UserContext);
  const netInfo = useNetInfo();
  // const setCart = useSetCart();
  const [errorCounter, setErrorCounter] = useState(0);
  console.log(PUBLIC_AUTH, 'PUBLIC_AUTH');
  console.log('width', Config);
  const {isError, mutateAsync: publicTokenRequest} = useCgMutation<Auth>({
    key: PUBLIC_AUTH,
    body: {
      grant_type: Config.GRANT_TYPE,
      client_id: Config.CLIENT_ID,
      client_secret: Config.CLIENT_SECRET,
    },
    url: PUBLIC_AUTH,
    offSuccessToast: true,
  });
  console.log(isError, 'this is error');
  /* This is a hook that is called when the component is mounted. */
  useEffect(() => {
    getTokon();
    if (isError && errorCounter < 0) {
      setErrorCounter(errorCounter + 1);
      toast(
        translations.OOPS_SOMETHING_WENT_WRONG_TRY_LETER,
        toastType.ERROR_TOAST,
      );
      setLoader(false);
    }
  }, [isError]);

  /**
   * If the user is connected to the internet, get the public token, otherwise, set the internet state
   * to false.
   */
  const getTokon = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected || state.isInternetReachable) {
        getPublicToken();
      } else {
        internetState(netInfo.isConnected!!);
      }
    });
  };

  /**
   * If the user is not connected to the internet, show an error message, otherwise, if the user is not
   * logged in, show an error message, otherwise, navigate to the login screen.
   * @returns The return value is the result of the last expression in the function.
   */
  const onLoginPress = () => {
    createFirebaseLog(onLoginPress.name, SCREEN.WELCOME);
    if (!netInfo.isConnected) {
      internetState(netInfo.isConnected!!);
      return;
    }
    if (storeData?.data?.access_token === null) {
      toast(
        translations.OOPS_SOMETHING_WENT_WRONG_TRY_LETER,
        toastType.ERROR_TOAST,
      );
      getTokon();
      return;
    }
    navigator.navigate(SCREEN.LOGIN);
  };

  const onGuestUserPress = () => {
    navigator.navigate(SCREEN.SHOP);
  };

  /**
   * If the user is not connected to the internet, show a toast message. If the user is connected to the
   * internet, navigate to the signup screen.
   * </code>
   * @returns The return value is the result of the last expression in the function.
   */
  const onSignUpPress = () => {
    createFirebaseLog(onSignUpPress.name, Welcome.name);
    if (!netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return;
    }
    if (storeData?.data?.access_token === null) {
      toast(
        translations.OOPS_SOMETHING_WENT_WRONG_TRY_LETER,
        toastType.ERROR_TOAST,
      );
      getTokon();
      return;
    }
    navigator.navigate(SCREEN.SIGNUP);
  };

  /**
   * GetPublicToken is a function that takes no arguments and returns a promise that resolves to a value
   * of type void.
   */
  const getPublicToken = async () => {
    setLoader(true);
    const response = await publicTokenRequest();
    console.log(response, 'public token response');

    setLoader(false);
    console.log('called');
    setDataToStore(response);
  };

  return (
    <View style={styles.container}>
      <Logo width={dW(240)} height={dW(240)} />

      <View style={styles.header}>
        <Text style={[styles.text]}>
          {translations.JOIN_THE_NO_ONE_PAGEANT_COMMUNITY}
        </Text>
      </View>
      <View style={[{marginBottom: 16}]}>
        <View style={styles.containerLogin}>
          <CustomButton
            inactive
            label={translations.SINGUP}
            onPress={onSignUpPress}
          />
        </View>
      </View>

      <View style={styles.containerLogin}>
        <CustomButton
          inactive
          label={translations.LOGIN}
          border={true}
          textStyle={styles.borderButtonText}
          onPress={onLoginPress}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.continueas}>{translations.CONTINUE_AS_A} </Text>
        <TouchableOpacity onPress={onGuestUserPress}>
          <Text style={styles.guestuser}>{translations.GUEST_USER}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;
