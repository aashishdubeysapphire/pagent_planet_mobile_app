import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import React from 'react';
import AppImages from '../../../../../../../../../../assets/images/AppImages';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../../../utils/responsiveSize';
import {CommonStyles} from '../../../../../../../../../../assets/commonStyles';
import {color} from '../../../../../../../../../../assets/colorConstant';
import CustomButton from '../../../../../../../../../common/button';
import {SCREEN} from '../../../../../../../../../../root/screenname';
import {StackActions, useNavigation} from '@react-navigation/core';
import translations from '../../../../../../../../../../assets/translations';

const CelebrationView = ({msg, id, isNewpagentAdded = false}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppImages.Common.congratulations_ICON />
        <Text style={styles.title}>{translations.ADD_CONSTESANT}</Text>

        <Text style={styles.msgLabel}>{msg}</Text>
        <View style={styles.imgcenter}>
          <Image
            source={AppImages.Common.tpp_see_prep_timeline_illustration_ICON}
            style={styles.tpp_see_prep_timeline_illustration_ICON}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            inactive
            label={translations.ADD_CONTESTANTS_NOW}
            onPress={() => {
              navigation.dispatch(
                StackActions.replace(SCREEN.EVENT_ADD_CONSTESTANT, {
                  eventId: id,
                  isNewpagentAdded: isNewpagentAdded,
                })
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default CelebrationView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: '18%',
  },
  header: {
    alignItems: 'center',
    marginBottom: moderateScaleVertical(62),
  },
  title: {
    ...CommonStyles.tpp_h2,
    color: color.P_PINK,
    lineHeight: moderateScaleVertical(24),
    fontWeight: '700',
    marginTop: moderateScaleVertical(26),
    marginBottom: moderateScaleVertical(8),
    textAlign: 'center',
    backgroundColor: 'transparent',
    marginHorizontal: moderateScale(16),
  },
  msgLabel: {
    ...CommonStyles.tpp_p2,
    color: color.INPUT_TEXT,
    lineHeight: moderateScaleVertical(20),
    textAlign: 'center',
    marginBottom: moderateScaleVertical(8),
    paddingHorizontal: moderateScaleVertical(16),
  },
  imgcenter: {
    marginTop: moderateScaleVertical(60),
  },
  buttonContainer: {
    paddingHorizontal: moderateScale(16),

    alignItems: 'center',
    width: '100%',
    marginTop: moderateScaleVertical(66),
  },
  tpp_see_prep_timeline_illustration_ICON: {
    width: Dimensions.get('window').width - moderateScale(32),
    height: moderateScaleVertical(160),
    resizeMode: 'contain',
  },
  iconView: {
    paddingHorizontal: moderateScale(16),
  },
});
