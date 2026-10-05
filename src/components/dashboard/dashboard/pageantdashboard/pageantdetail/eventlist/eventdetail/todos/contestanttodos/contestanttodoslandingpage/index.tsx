import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React from 'react';
import {styles} from './styles';
import BottomModal from '../../../../../../../../../common/bottommodal';
import AppImages from '../../../../../../../../../../assets/images/AppImages';
import translations from '../../../../../../../../../../assets/translations';
import {moderateScaleVertical} from '../../../../../../../../../utils/responsiveSize';

interface Props {
  isModalVisible: boolean | undefined;
  setIsModalVisible: any;
  setModalVisible: any;
  eventTenseStatus: string | undefined;
  eventId: number | undefined;
  ageId: string;
  onPressAddTodo: any;
}

const AddNewToDoPopup = ({
  isModalVisible,
  setIsModalVisible: setModalVisibleState,
  onPressAddTodo,
  setModalVisible,
}: Props) => {
  const PointsView = ({lable}) => {
    return (
      <View style={styles.rowView}>
        <Image
          source={AppImages.Common.filledRatingIcon}
          style={styles.filledRatingIcon}
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
    setModalVisibleState(true);

    setModalVisible(false);
    setTimeout(() => {
      onPressAddTodo();
    }, 500);
  };

  return (
    <BottomModal
      isModalVisible={isModalVisible}
      setIsModalVisible={onBack}
      customStyles={{paddingHorizontal: moderateScaleVertical(16)}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.mainContainer}>
        <TouchableOpacity
          style={styles.crossView}
          onPress={() => {
            setModalVisibleState(true);
            setModalVisible(false);
          }}>
          <AppImages.ProfileImage.Tpp_cross_icon />
        </TouchableOpacity>
        <View style={styles.imageSection}>
          <Image
            source={AppImages.Common.TodoIllustration}
            style={styles.mainimage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.heading}>
          {translations.SHOP_CONTESTANT_MANAGEMENT_SOFTWARE}
        </Text>
        <PointsView lable={translations.CUSTOMIZED_SCHEDULES} />
        <PointsView lable={translations.DEADLINE_REMINDERS} />
        <PointsView lable={translations.REVIEW_SUBMISSIONS} />
        <PointsView lable={translations.EXPORT_CONTESTANT_HEADSHOTS} />

        <TouchableOpacity style={styles.buttonView} onPress={onPressAddResults}>
          <Text style={styles.addResultLabel}>
            {translations.ADD_NEW_TO_DO}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </BottomModal>
  );
};

export default AddNewToDoPopup;
