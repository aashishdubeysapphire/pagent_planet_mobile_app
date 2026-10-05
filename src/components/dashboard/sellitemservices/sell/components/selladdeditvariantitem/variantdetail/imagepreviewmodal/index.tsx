import {
  View,
  Modal,
  Image,
  ImageProps,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Pinchable from 'react-native-pinchable';
import {ImageBackground} from 'react-native';
import AppImages from '../../../../../../../../assets/images/AppImages';

interface Props {
  imagePath: ImageProps;
  isPreviewModalVisible: boolean;
  setIsPreviewModalVisible: (arg0: boolean) => void;
}
const ImagePreviewModal = ({
  imagePath,
  isPreviewModalVisible,
  setIsPreviewModalVisible,
}: Props) => {
  return (
    <Modal animationType="slide" visible={isPreviewModalVisible} transparent>
      <SafeAreaView style={styles.container}>
        <ImageBackground style={{flex: 1}} blurRadius={5}>
          <View>
            <TouchableOpacity
              onPress={() => {
                setIsPreviewModalVisible(false);
              }}
              style={styles.touchStyle}>
              <TouchableOpacity
                style={styles.crossIcon}
                onPress={() => {
                  setIsPreviewModalVisible(false);
                }}>
                <AppImages.ProfileImage.Tpp_cross_icon />
              </TouchableOpacity>
            </TouchableOpacity>
            <Pinchable>
              <Image source={{uri: imagePath}} style={styles.imageStyles} />
            </Pinchable>
            <TouchableOpacity
              onPress={() => {
                setIsPreviewModalVisible(false);
              }}
              style={styles.touchStyle}
            />
          </View>
        </ImageBackground>
      </SafeAreaView>
    </Modal>
  );
};

export default ImagePreviewModal;
