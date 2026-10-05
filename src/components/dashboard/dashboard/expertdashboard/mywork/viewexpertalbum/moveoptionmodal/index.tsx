import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react';
import BottomModal from '../../../../../../common/bottommodal';
import AppImages from '../../../../../../../assets/images/AppImages';
import {styles} from './styles';
import {
  height,
  moderateScaleVertical,
} from '../../../../../../utils/responsiveSize';
import translations from '../../../../../../../assets/translations';
import {EXPERT_ALUM_TYPE} from '../../../../../../utils/enum';

const MoveOptionModal = ({
  isModalVisible = false,
  setIsModalVisible = any,
  onAlbumTypeSelection = any,
}) => {
  return (
    <BottomModal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      customStyles={{
        height: height / 1.7,
        paddingHorizontal: moderateScaleVertical(16),
      }}>
      <SafeAreaView>
        <View style={styles.rowView}>
          <Text style={styles.modalHeading}>
            {translations.WHERE_YOU_WANT_TO_MOVE_AN_ALBUM}
          </Text>
          <TouchableOpacity
            style={styles.crossIcon}
            onPress={() => setIsModalVisible(false)}>
            <AppImages.ProfileImage.Tpp_cross_icon />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() =>
            onAlbumTypeSelection(EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH)
          }>
          <Text style={styles.textstyle}>
            {translations.CONTESTANT_WORKED_WITH}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            onAlbumTypeSelection(EXPERT_ALUM_TYPE.PAGEANT_WORKED_WITH)
          }>
          <Text style={styles.textstyle}>
            {translations.PAGEANT_WORKED_WITH}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </BottomModal>
  );
};

export default MoveOptionModal;
