import {View, Text, ScrollView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Header from '../../../common/header';
import translations from '../../../../assets/translations';
import {styles} from './styles';
import FloatingInput from '../../../common/floatinginput';
import CustomButton from '../../../common/button';
import {Password} from '../../../utils/validations';
import useCgMutation from '../../../../services/api/useCgMutation';
import {CHECK_OLD_PASSWORD} from '../../../../services/endpoints';
import {UserContext} from '../../../../store/userStore';
import {SCREEN} from '../../../../root/screenname';
import {useSetLoader} from '../../../../store/useAppStore';
import {internetState} from '../../../common/commonalert';
import {useNetInfo} from '@react-native-community/netinfo';
import {useIsFocused} from '@react-navigation/native';
import {Base} from '../../../../services/models/base';
import {keyBoardManager} from '../../../utils/helperFunction';
import {SafeAreaView} from 'react-native-safe-area-context';

const ChangePassword = ({navigation}) => {
  const [oldPassword, setOldPassword] = useState('');
  const netInfo = useNetInfo();
  const [isPassword, setPaswordActive] = React.useState(true);
  const isFocus = useIsFocused();
  const [erroldPassword, seterrOldPassword] = useState('');
  const {storeData} = useContext(UserContext);
  const setLoader = useSetLoader();
  const changePasswordBody = {
    old_password: oldPassword,
  };

  const {mutateAsync: checkOldPassword} = useCgMutation<Base>({
    key: CHECK_OLD_PASSWORD,
    body: changePasswordBody,
    url: CHECK_OLD_PASSWORD,
    offSuccessToast: true,
  });

  /* This is a react hook that is called when the component is mounted. */
  useEffect(() => {
    setOldPassword('');
  }, [isFocus]);

  /* This is a react hook that is called when the component is mounted. */
  useEffect(() => {
    keyBoardManager();
  }, []);

  /**
   * _onPressButton is an async function that checks if the old password is valid and if the user is
   * connected to the internet. If the old password is valid, the user is redirected to the password
   * reset screen
   */
  const _onPressButton = async () => {
    if (isValid()) {
      if (!netInfo.isConnected) {
        internetState(netInfo.isConnected!!);
        return false;
      }
      setLoader(true);
      const response = await checkOldPassword();

      if (response.success) {
        navigation.replace(SCREEN.PASSWORD_RESET, {
          email: storeData?.data?.user.email,
          isLoggedIn: true,
        });
      }
    }
  };

  /**
   * It checks if the old password is valid.
   * @returns A boolean value.
   */
  const isValid = () => {
    let err = Password(oldPassword);

    if (!!err) {
      seterrOldPassword(err);
      return false;
    } else {
      seterrOldPassword('');
      return true;
    }
  };
  const INFO_ARRAY = [
    {
      label: translations.FORGOT_PASSWORD,
      info: translations.FORGOT_INFO,
    },
  ];
  return (
    <SafeAreaView style={styles.topContainer}>
      <View style={styles.topContainer}>
        <Header
          lable={translations.CHANGE_PASSWORD}
          isUnderLineRequired
          infoIcon={true}
          infoDataArray={INFO_ARRAY}
        />
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={styles.container}>
          <Text style={styles.oldPasswordText}>
            {translations.ENTER_OLD_PASSWORD_FIRST}
          </Text>
          <View style={styles.inputFieldView}>
            <FloatingInput
              floatingText={translations.OLD + ' ' + translations.PASSWORD}
              returnKeyType={'done'}
              value={oldPassword}
              setText={val => setOldPassword(val)}
              password
              isPassword={isPassword}
              autoCapitalize={'none'}
              onPasswordToglle={setPaswordActive}
              isMandatory
              errorMsg={erroldPassword}
              onDoneClick={_onPressButton}
            />
          </View>
          <View style={styles.buttonView}>
            <CustomButton
              label={translations.NEXT}
              onPress={_onPressButton}
              inactive={oldPassword.length > 0}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
