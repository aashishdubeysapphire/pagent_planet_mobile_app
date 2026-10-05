/* A Component Used for showing Information Modal, which gets open when we click on the Info Icon
   of an header . it shows the Information of a specific screen. */

import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import BottomModal from '../bottommodal';
import AppImages from '../../../assets/images/AppImages';
import {styles} from './styles';
import translations from '../../../assets/translations';
import {moderateScaleVertical} from '../../utils/responsiveSize';

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: any;
  data: any;
  heading: string;
  button: boolean;
  screenName: string;
  onModalButtonPress: any;
}

const InfoModal = ({
  isModalVisible,
  setIsModalVisible,
  data = [],
  heading,
  button,
  screenName,
  onModalButtonPress,
}: Props) => {
  const [displayData] = React.useState(data);
  const [lastIndex] = React.useState(displayData.length - 1);

  React.useEffect(() => {}, [isModalVisible]);

  const onButtonPressed = () => {
    setIsModalVisible(false);
    onModalButtonPress();
  };

  return (
    <BottomModal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      customStyles={{paddingHorizontal: moderateScaleVertical(16)}}>
      <View style={styles.headingView}>
        <Text style={styles.modalHeading}>{heading}</Text>
        <TouchableOpacity
          onPress={() => {
            setIsModalVisible(false);
          }}
          style={styles.crossIcon}>
          <AppImages.ProfileImage.Tpp_cross_icon />
        </TouchableOpacity>
      </View>

      <View style={styles.flatlistContainer}>
        <FlatList
          data={displayData}
          keyExtractor={(x, i) => i.toString()}
          showsVerticalScrollIndicator={true}
          renderItem={({item, index}) => (
            <View>
              <Text style={styles.infoHeadingLabel}>{item?.label}</Text>
              <Text style={styles.infoLabel}>{item?.info}</Text>
              {button &&
              item?.label === translations.PHONE &&
              screenName === translations.ADD_EVENT_SMALL ? (
                <View style={styles.tapHereView}>
                  <TouchableOpacity onPress={() => onButtonPressed()}>
                    <Text style={styles.tapHereStyles}>
                      {translations.TAP_HERE}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.infoLabel}>
                    {translations.TO_VISIT_YOUR_PAGEANT_PROFILE}
                  </Text>
                </View>
              ) : null}
              {lastIndex !== index ? <View style={styles.line} /> : null}
            </View>
          )}
        />
      </View>
    </BottomModal>
  );
};

export default InfoModal;
