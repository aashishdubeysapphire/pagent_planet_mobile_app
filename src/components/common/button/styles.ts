import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {font} from '../../../assets/fonts/fontsConstant';
import {moderateScaleVertical, textScale} from '../../utils/responsiveSize';
import useDynamicWidth from '../../utils/useDynamicWidth';
const useStyle = () => {
  const dW = useDynamicWidth();

  return StyleSheet.create({
    buttonText: {
      color: color.WHITE,
      fontSize: textScale(18),
      fontFamily: font.LatoBold,
      textTransform: 'uppercase',
      lineHeight: moderateScaleVertical(24),
    },
    smallButtonText: {
      ...CommonStyles.latoBoldWhite14,
      color: color.WHITE,
      textTransform: 'uppercase',
    },

    smallButonBg: {
      backgroundColor: color.P_PINK,
      borderRadius: 30,
      height: moderateScaleVertical(40),
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: moderateScaleVertical(16),
    },
    uploadButonBg: {
      backgroundColor: color.P_PINK,
      borderRadius: 30,
      height: moderateScaleVertical(48),
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: dW(15),
    },
    buttonBg: {
      backgroundColor: color.P_PINK,
      borderRadius: 30,
      height: moderateScaleVertical(60),
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: dW(15),
    },
    inActiveBorderButtonBg: {
      borderRadius: 30,
      borderColor: color.S_GRAY_3,
      borderWidth: moderateScaleVertical(1),
      height: moderateScaleVertical(60),
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: dW(15),
    },
    borderEdit: {
      borderRadius: 30,
      borderColor: color.P_PINK,
      borderWidth: moderateScaleVertical(1),
      height: moderateScaleVertical(100),
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    borderDelete: {
      borderRadius: 30,
      borderColor: color.S_GRAY_3,
      borderWidth: moderateScaleVertical(1),
      height: moderateScaleVertical(60),
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: dW(15),
    },
    inActiveBorderButtonText: {
      color: color.BLACK,
      fontSize: textScale(14),
      fontFamily: font.LatoBold,
      textTransform: 'uppercase',
    },
    borderButtonBg: {
      borderRadius: 30,
      borderColor: color.P_PINK,
      borderWidth: moderateScaleVertical(1),
      height: moderateScaleVertical(100),
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    inactiveButtonBg: {
      backgroundColor: color.S_PINK_2,
      borderRadius: 30,
      height: moderateScaleVertical(60),
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: dW(15),
    },
  });
};

export default useStyle;
