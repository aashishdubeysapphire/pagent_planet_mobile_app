import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React from 'react';
import {styles} from './styles';
import BottomModal from '../../../../../../../../../common/bottommodal';
import AppImages from '../../../../../../../../../../assets/images/AppImages';
import translations from '../../../../../../../../../../assets/translations';
import {useNavigation} from '@react-navigation/core';
import {EVENT_STATUS} from '../../../../../../../../../utils/enum';
import {SCREEN} from '../../../../../../../../../../root/screenname';
import { moderateScaleVertical } from '../../../../../../../../../utils/responsiveSize';

interface Props {
  isModalVisible: boolean | undefined;
  setIsModalVisible: any;
  setModalVisible: any;
  eventTenseStatus: string | undefined;
  eventId: number | undefined;
  ageId: string;
}

const AddResultPopup = ({
  isModalVisible,
  setIsModalVisible: setModalVisibleState,
  eventTenseStatus,
  eventId,
  ageId,
  setModalVisible,
}: Props) => {
  const navigation = useNavigation();
  const PointsView = ({lable}) => {
    return (
      <View style={styles.rowView}>
        <Image
          source={AppImages.Common.filledRatingIcon}
          style={styles.filledRatingStyle}
        />
        <Text style={styles.pointersText}>{lable}</Text>
      </View>
    );
  };

  const onBack = val => {
    setModalVisibleState(true);
    setModalVisible(val);
  };

  const onPressAddResults = () => {
    setModalVisible(false);
    setModalVisibleState(true);
    if (eventTenseStatus === EVENT_STATUS.PAST) {
      navigation.navigate(SCREEN.EVENT_ADD_EDIT_RESULT, {
        eventId: eventId,
        ageDivisionId: ageId,
        idEditResult: false,
      });
    }
  };

  return (
    <BottomModal
      isModalVisible={isModalVisible}
      setIsModalVisible={onBack}
      customStyles={{paddingHorizontal: moderateScaleVertical(16)}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.mainView}>
        <TouchableOpacity
          style={styles.crossButtonContainer}
          onPress={() => {
            setModalVisibleState(true);
            setModalVisible(false);
          }}>
          <AppImages.ProfileImage.Tpp_cross_icon />
        </TouchableOpacity>
        <View style={styles.imageSection}>
          <Image
            source={AppImages.RESULTS.tpp_add_result_illustration}
            style={styles.mainimage}
          />
        </View>

        <Text style={styles.heading}>{translations.UPDATE_YOUR_RULES}</Text>
        <PointsView lable={translations.INC_TOTLA_PARTICIPENTS} />
        <PointsView lable={translations.IMP_PROFILE_CREDIBILTY} />
        <PointsView lable={translations.GET_FEATURED_ON_CONTESTENT_PRIOFILE} />
        <PointsView lable={translations.CELEBRATE_AND_REWARDS} />

        <TouchableOpacity style={styles.buttonView} onPress={onPressAddResults}>
          <Text style={styles.addResultLabel}>{translations.ADD_RESULT}</Text>
        </TouchableOpacity>
      </ScrollView>
    </BottomModal>
  );
};

export default AddResultPopup;
