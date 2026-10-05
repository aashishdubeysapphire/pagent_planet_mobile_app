import React, {useContext} from 'react';
import {Text, TouchableOpacity, Image, View} from 'react-native';
import {styles} from './styles';
import Modal from 'react-native-modal';
import AppImages from '../../../assets/images/AppImages';
import SecondaryButton from '../../common/secondarybutton';
import {RootContext} from '../../../store/rootStore';
import {useSetHideShowBottomBar} from '../../../store/useAppStore';
import translations from '../../../assets/translations';
import {VersionDetail} from '../../../services/models/version';
import {isIosDevice, openWebLink} from '../../utils/helperFunction';
import {
  APPLE_STORELINK,
  GOOGLE_STORE_LINK,
} from '../../../services/staticWebUrl';
interface Props {
  closeModal: (event: boolean) => void;
  isModalVisible: boolean;
  version?: VersionDetail;
}

const VersionControlModal = ({isModalVisible, closeModal, version}: Props) => {
  const {setWelcomePopViewed} = useContext(RootContext);
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
  const update = () => {
    if (!isIosDevice()) {
      openWebLink(GOOGLE_STORE_LINK);
    } else {
      openWebLink(APPLE_STORELINK);
    }
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
      <View style={styles.topContainer}>
        <View style={styles.container}>
          <Image source={AppImages.Dashboard.VersionIcon} />
          <Text style={styles.headerLabel}>{translations.STAY_UP_TO_DATE}</Text>
          <View style={styles.buttonStyles}>
            {/* <SecondaryButton
              active={true}
              label={translations.UPGARDE_NOW}
              onPress={update}
            /> */}
          </View>
          <TouchableOpacity
            style={styles.skipContainer}
            onPress={closeOpenModal}>
            {!version?.forceUpdate && (
              <Text style={styles.skip}>{translations.SKIP_BUTTON}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default VersionControlModal;
