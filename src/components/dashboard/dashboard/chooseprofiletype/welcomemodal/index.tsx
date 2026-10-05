import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import Modal from 'react-native-modal';
import SecondaryButton from '../../../../common/secondarybutton';
import {RootContext} from '../../../../../store/rootStore';
import {useSetHideShowBottomBar} from '../../../../../store/useAppStore';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../root/screenname';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';
import translations from '../../../../../assets/translations';

interface Props {
  label: string;
  bodyText: string;
  buttonText: string;
  closeModal: (event: boolean) => void;
  inactive?: boolean;
  isModalVisible: boolean;
  customStyles?: any;
  giveStaticHeight?: boolean;
  icon: React.ReactNode;
  isUploadModal: boolean;
  isClaimModal: boolean;
  eventId: number;
  isExpert: boolean;
  isPageant: boolean;
  customHeight: any;
  onPresssButton: Function;
}

const WelcomeModal = ({
  label,
  bodyText,
  icon,
  isModalVisible,
  buttonText,
  closeModal,
  customStyles = {},
  giveStaticHeight = true,
  isUploadModal = false,
  eventId,
  isClaimModal = false,
  isExpert = false,
  isPageant = false,
  customHeight,
  onPresssButton,
}: Props) => {
  const {setWelcomePopViewed} = useContext(RootContext);
  const navigation = useNavigation();
  const setHideBottomBar = useSetHideShowBottomBar();

  const closeOpenModal = () => {
    setWelcomePopViewed(false);
    setTimeout(() => {
      setHideBottomBar(true);
    }, 200);
    setTimeout(() => {
      closeModal(false);
    }, 300);
  };

  const handleButtonPress = () => {
    closeModal(false);
    onPresssButton();
  };

  return (
    <Modal
      isVisible={isModalVisible}
      backdropOpacity={0.45}
      useNativeDriver={true}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={1000}
      animationOutTiming={1000}>
      <View style={{...styles.topContainer, ...customHeight}}>
        <View
          style={
            giveStaticHeight
              ? styles.container
              : {
                  ...styles.containerWithOutStatciHeight,
                  paddingTop: isUploadModal
                    ? moderateScaleVertical(56)
                    : moderateScaleVertical(45),
                }
          }>
          {icon}
          <Text
            style={{
              ...styles.headerLabel,
              marginTop: isUploadModal
                ? moderateScaleVertical(40)
                : moderateScaleVertical(5),
            }}>
            {label}
          </Text>
          <Text
            style={{
              ...styles.textLabel,
              paddingHorizontal: isUploadModal
                ? isPageant
                  ? moderateScale(20)
                  : moderateScale(0)
                : moderateScale(16),
              marginTop: isUploadModal
                ? moderateScaleVertical(8)
                : moderateScaleVertical(12),
            }}>
            {bodyText}
          </Text>
          {isUploadModal && isClaimModal && (
            <Text
              style={{
                ...styles.textLabel1,
              }}>
              {isExpert || isPageant
                ? null
                : translations.MANAGE_CONTESTANT_PROFILE}
            </Text>
          )}

          <View style={{...styles.buttonStyles, ...customStyles}}>
            <SecondaryButton
              active={true}
              label={buttonText}
              onPress={
                onPresssButton
                  ? () => {
                      handleButtonPress();
                    }
                  : isUploadModal && !isClaimModal
                  ? () => {
                      navigation.navigate(SCREEN.MY_UPLOADS, eventId);
                      closeModal(false);
                    }
                  : isClaimModal && isUploadModal
                  ? () => {
                      navigation.navigate(SCREEN.EDIT_PROFILE, {
                        name: translations.CLAIM_PROFILE,
                      });
                      closeModal(false);
                    }
                  : () => {
                      closeOpenModal();
                    }
              }
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default WelcomeModal;
