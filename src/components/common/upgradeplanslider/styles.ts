import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {moderateScale, moderateScaleVertical} from '../../utils/responsiveSize';
const useStyle = () => {
  return StyleSheet.create({
    eventSection: {
      position: 'absolute',
      justifyContent: 'space-between',
      height: '100%',
      paddingStart: moderateScale(16),
      paddingTop: moderateScale(16),
      paddingEnd: moderateScale(16),
      paddingBottom: moderateScale(16),
    },

    borderButtonText: {
      ...CommonStyles.tpp_h4,
      color: color.P_PINK,
      fontWeight: 'bold',
      width: moderateScaleVertical(106),
      paddingTop: moderateScaleVertical(8),
      paddingBottom: moderateScaleVertical(8),
      textAlign: 'center',
      fontSize: moderateScaleVertical(12),
    },
    upgradePlanHeaderTitle: {
      ...CommonStyles.robotoMedium14,
    },
    upgradePlanSubHeaderTitle: {
      ...CommonStyles.tpp_s2,
      marginTop: moderateScaleVertical(2),
    },
    upgradeButtonContainer: {
      width: moderateScaleVertical(106),
      height: moderateScaleVertical(32),
      paddingBottom: 0,
    },
    upgradeSliderContainter: {
      marginTop: moderateScaleVertical(16),
      alignContent: 'center',
      justifyContent: 'center',
      width: 'auto',
      maxHeight: moderateScaleVertical(160),
    },
    containerDelete: {
      borderColor: color.P_PINK,
      borderWidth: 1,
      borderRadius: 30,
      width: moderateScaleVertical(106),
      height: moderateScaleVertical(32),
    },
    upgradeContainerStyle: {
      paddingTop: 0,
      paddingBottom: 0,
      marginTop: moderateScale(12),
    },
    upgradeInactiveDotStyle: {
      width: moderateScale(14),
      height: moderateScale(14),
      borderRadius: moderateScale(7),
      marginHorizontal: -moderateScale(10),
      backgroundColor: color.S_GRAY_3,
    },
    activeDotStyle: {
      width: moderateScale(20),
      height: moderateScale(6),
      borderRadius: moderateScale(8),
      marginHorizontal: -moderateScale(4),
      backgroundColor: color.P_PINK,
    },
    upcomingEventSection: {
      width: '100%',
      paddingVertical: moderateScaleVertical(16),
    },
    carouselContainer: {
      height: moderateScaleVertical(135),
      flexDirection: 'row',
      alignSelf: 'center',
    },
    upgradeButtonAreaStyles: {
      borderRadius: moderateScaleVertical(30),
      borderColor: color.P_PINK,
      borderWidth: 1,
      width: moderateScaleVertical(106),
    },
  });
};

export default useStyle;
