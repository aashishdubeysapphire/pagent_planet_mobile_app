import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {font} from '../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/responsiveSize';
const useStyle = () => {
  return StyleSheet.create({
    mainView: {
      marginBottom: moderateScaleVertical(16),
    },
    selectedAwards: {
      borderWidth: 1,
      borderColor: color.S_GRAY_2,
      paddingTop: moderateScaleVertical(10),
      paddingBottom: moderateScaleVertical(4),
      paddingHorizontal: moderateScale(24),
      borderRadius: 30,
    },
    awardsText: {
      fontFamily: font.RobotoRegular,
      fontSize: textScale(12),
      marginBottom: moderateScaleVertical(8),
      color: color.S_GRAY_4,
    },

    clickable: {
      borderWidth: 1,
      borderColor: color.S_GRAY_E1,
      marginBottom: moderateScaleVertical(8),
      paddingHorizontal: moderateScale(12),
      marginRight: moderateScaleVertical(8),
      paddingVertical: moderateScaleVertical(8),
      borderRadius: 30,
      flexDirection: 'row',
      backgroundColor: color.S_GRAY_1,
    },
    awardName: {
      ...CommonStyles.tpp_p3,
      marginRight: moderateScale(8),
    },
    addMore: {
      color: color.P_PINK,
      fontFamily: font.LatoBold,
      fontSize: textScale(12),
      marginLeft: 'auto',
    },
    uploadImageInnerView: {
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    red: {color: color.RED},
    row: {
      alignItems: 'center',
      marginTop: moderateScaleVertical(2),
      flexDirection: 'row',
    },
    error: {
      color: color.RED,
      marginStart: moderateScale(2),
      fontSize: textScale(8),
      fontFamily: font.RobotoMedium,
    },

    noError: {
      height: 0,
    },
  });
};

export default useStyle;
