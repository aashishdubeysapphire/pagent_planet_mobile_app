import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import AppImages from '../../../../../../../../../assets/images/AppImages';
import translations from '../../../../../../../../../assets/translations';
import React from 'react';
import Modal from 'react-native-modal';
import {
  Contestant,
  OperatingHourMultiple,
} from '../../../../../../../../../services/models/pageantdetails/contestant';
import {moderateScaleVertical} from '../../../../../../../../utils/responsiveSize';

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: any;
  expertLocationTime: OperatingHourMultiple | undefined;
  contestant: Contestant | undefined;
}

/* This is a react component which is used to show the list of countries and states. */
const ExpertStoreTimingModal = ({
  isModalVisible,
  setIsModalVisible,
  expertLocationTime,
  contestant,
}: Props) => {
  return (
    <Modal
      isVisible={isModalVisible}
      backdropOpacity={0.2}
      useNativeDriver={true}
      animationIn={'fadeInUp'}
      animationOut={'fadeOutDown'}
      style={{marginHorizontal: 0, marginVertical: 0, marginTop: 250}}>
      <View style={styles.modalContainer}>
        <View style={styles.headingView}>
          <Text style={styles.modalHeading}>{translations.OPENING_HOUR}</Text>
          <TouchableOpacity
            style={styles.crossIcon}
            onPress={() => {
              setIsModalVisible(false);
            }}>
            <AppImages.ProfileImage.Tpp_cross_icon />
          </TouchableOpacity>
        </View>

        <View style={styles.itemContainer}>
          <View style={[styles.icon, {marginStart: moderateScaleVertical(2)}]}>
            <AppImages.Dashboard.LocationIcon width={10} height={14} />
          </View>
          <Text style={styles.subHeadingLabel} ellipsizeMode="tail">
            {expertLocationTime?.address}
          </Text>
        </View>

        <FlatList
          data={expertLocationTime?.weekTiming}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          key={'#'}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <Text
              style={
                item.isActive ? styles.timingActiveText : styles.timingText
              }>
              {item.time}
            </Text>
          )}
        />
      </View>
    </Modal>
  );
};

export default ExpertStoreTimingModal;
