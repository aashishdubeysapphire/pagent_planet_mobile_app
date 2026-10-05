import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import useStyle from './styles';
import AppImages from '../../../assets/images/AppImages';
import translations from '../../../assets/translations';
import {color} from '../../../assets/colorConstant';

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: any;
  setConfirm?: any;
  setCancel?: any;
  msg: string;
  children?: any;
  yesButtonText?: string;
  headingStyle?: any;
  onDenay?: any;
  isTodoModal?: boolean;
  cancleButtonText?: string;
}

/* A function component. */
const WarningModel = ({
  isModalVisible,
  setIsModalVisible,
  setConfirm = () => {},
  setCancel = () => {},
  msg,
  yesButtonText = '',
  headingStyle,
  onDenay = () => {},
  isTodoModal = false,
  cancleButtonText = '',
  children,
}: Props) => {
  const styles = useStyle();

  /**
   * OnCancel() is a function that sets the state of isModalVisible to false
   */
  const onCancel = () => {
    setIsModalVisible(false);
    isTodoModal ? setCancel() : null;
  };

  /**
   * When the user clicks the confirm button, the modal is hidden and the confirm function is called
   */
  const onConfirm = () => {
    setIsModalVisible(false);
    setConfirm();
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
        onPress={onCancel}></TouchableOpacity>
      <View style={styles.modalContainer}>
        <View>
          <TouchableOpacity style={styles.crossIcon} onPress={onCancel}>
            <AppImages.ProfileImage.Tpp_cross_icon />
          </TouchableOpacity>

          <Text style={headingStyle}>{msg}</Text>
          {children}
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={styles.containerDelete}
              onPress={() => {
                onDenay();
                onCancel();
                setCancel();
              }}>
              <Text style={{...styles.borderButtonText, color: color.BLACK}}>
                {!!cancleButtonText ? cancleButtonText : translations.CANCLE}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.containerConfirm}
              onPress={onConfirm}>
              <Text style={styles.borderButtonText}>
                {!!yesButtonText ? yesButtonText : translations.CONFIRM}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default WarningModel;
