import {StyleSheet, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {moderateScaleVertical} from '../../utils/responsiveSize';
import {color} from '../../../assets/colorConstant';

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: any;
  children: any;
  customStyles: any;
}
const ForceLogoutModal = ({
  isModalVisible,
  setIsModalVisible,
  children,
  customStyles,
}: Props) => {
  return (
    <Modal
      isVisible={isModalVisible}
      backdropOpacity={0.2}
      animationIn={'fadeInUp'}
      animationOut={'fadeOutDown'}
      onBackButtonPress={setIsModalVisible}
      keyboardShouldPersistTaps={'always'}
      style={{flex: 1, marginHorizontal: 0, marginVertical: 0, marginTop: 70}}>
      <TouchableOpacity
        style={{flex: 1}}
        onPress={ setIsModalVisible}
        activeOpacity={1}></TouchableOpacity>
      <KeyboardAvoidingView
        style={{...styles.modalContainer, ...customStyles}}
        keyboardShouldPersistTaps={'always'}>
        <>{children}</>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ForceLogoutModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: color.WHITE,
    height: '100%',
    borderTopRightRadius: moderateScaleVertical(20),
    borderTopLeftRadius: moderateScaleVertical(20),
    paddingTop: moderateScaleVertical(20),
  },
});
