import React from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import {styles} from './styles';
import Modal from 'react-native-modal';
import AppImages from '../../../../../assets/images/AppImages';

interface Props {
  isModalVisible: boolean;
  setModalVisible: Function;
}

const PageantPayModal = ({isModalVisible, setModalVisible}: Props) => {
  const closeOpenModal = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      isVisible={isModalVisible}
      backdropOpacity={0.45}
      useNativeDriver={true}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={1000}
      animationOutTiming={1000}
      coverScreen={true}
      hasBackdrop={true}
      onBackdropPress={() => closeOpenModal()}
      onBackButtonPress={() => closeOpenModal()}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.crossIcon}
          onPress={() => closeOpenModal()}>
          <AppImages.ProfileImage.Tpp_cross_icon />
        </TouchableOpacity>
        <View style={styles.container}>
          <Image
            source={AppImages.SHOP.PageantPayModal1}
            style={styles.bgIcon1}
            resizeMode="contain"
          />
        </View>
        <Image
          source={AppImages.SHOP.PageantPayModal2}
          style={styles.bgIcon2}
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
};

export default PageantPayModal;
