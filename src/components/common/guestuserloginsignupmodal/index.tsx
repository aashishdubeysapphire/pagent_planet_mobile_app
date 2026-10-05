import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import Modal from 'react-native-modal';
import {styles} from './styles';
import translations from '../../../assets/translations';
import CustomButton from '../button';
import Logo from '../logo';
import AppImages from '../../../assets/images/AppImages';
import {moderateScaleVertical} from '../../utils/responsiveSize';
import {SCREEN} from '../../../root/screenname';
import {useNavigation} from '@react-navigation/core';
import {toast, toastType} from '../commonalert';
import CustomToast from '../toast';

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: any;
  toastMessage?: string;
}

/* A function component. */
const GuestUserLoginSignModel = ({
  isModalVisible,
  setIsModalVisible,
  toastMessage,
}: Props) => {
  const navigator = useNavigation();

  useEffect(() => {
    if (
      isModalVisible &&
      toastMessage !== undefined &&
      toastMessage.length > 0
    ) {
      toast(toastMessage, toastType.SUCESS_TOAST);
    }
  }, [isModalVisible]);
  const onCancel = () => {
    setIsModalVisible(false);
  };
  const onSignUpPress = () => {
    onCancel();
    navigator.reset({
      index: 0,
      routes: [{name: SCREEN.SIGNUP}],
    });
  };
  const onLoginPress = () => {
    onCancel();
    navigator.reset({
      index: 0,
      routes: [{name: SCREEN.LOGIN}],
    });
  };
  return (
    <Modal
      isVisible={isModalVisible}
      backdropOpacity={0.2}
      useNativeDriver={true}
      animationIn={'fadeInUp'}
      onBackButtonPress={onCancel}
      animationOut={'fadeOutDown'}
      style={{flex: 1, marginHorizontal: 0, marginVertical: 0}}>
      <TouchableOpacity
        style={{flex: 1}}
        activeOpacity={1}
        onPress={onCancel}
      />

      <View style={styles.container}>
        <TouchableOpacity style={styles.crossIcon} onPress={onCancel}>
          <AppImages.ProfileImage.Tpp_cross_icon />
        </TouchableOpacity>
        <View style={styles.viewcontainer}>
          <Logo
            width={moderateScaleVertical(173)}
            height={moderateScaleVertical(145)}
          />
        </View>
        <Text style={[styles.text]}>
          {translations.SIGN_LOGIN_TO_PURCHASE_AND_UNLOCK_PRODUCT_FEATURE}
        </Text>
        <CustomButton
          inactive
          label={translations.SINGUP}
          smallHeight
          onPress={onSignUpPress}
        />
        <View style={styles.containerLogin}>
          <CustomButton
            inactive
            label={translations.LOGIN}
            border={true}
            smallHeight
            textStyle={styles.borderButtonText}
            onPress={onLoginPress}
          />
        </View>
      </View>
      <CustomToast />
    </Modal>
  );
};

export default GuestUserLoginSignModel;
