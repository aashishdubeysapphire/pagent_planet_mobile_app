import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import BottomModal from '../../../../../common/bottommodal';
import AppImages from '../../../../../../assets/images/AppImages';
import {styles} from './styles';
import translations from '../../../../../../assets/translations';
import {moderateScaleVertical} from '../../../../../utils/responsiveSize';

const ViewAllCountriesModal = ({
  isModalVisible,
  setIsModalVisible,
  countryList,
}) => {
  return (
    <BottomModal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      customStyles={{
        height: '60%',
        paddingHorizontal: moderateScaleVertical(16),
      }}>
      <View style={styles.headingView}>
        <Text style={styles.modalHeading}>
          {translations.PRODUCT_AVAILABILITY}
        </Text>
        <TouchableOpacity
          style={styles.crossIcon}
          onPress={() => {
            setIsModalVisible(false);
          }}>
          <AppImages.ProfileImage.Tpp_cross_icon />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapView}>
          {!!countryList &&
            countryList.map((i: {name: string}, index: number) => {
              return (
                <View style={styles.countriesOvel}>
                  <Text style={styles.countryName}>{i.name}</Text>
                </View>
              );
            })}
        </View>
      </ScrollView>
    </BottomModal>
  );
};

export default ViewAllCountriesModal;
