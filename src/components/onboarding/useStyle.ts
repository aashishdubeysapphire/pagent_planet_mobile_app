import { StyleSheet } from 'react-native';
import { color } from '../../assets/colorConstant';
import { CommonStyles } from '../../assets/commonStyles';
import { font } from '../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../utils/responsiveSize';
import useDynamicWidth from '../utils/useDynamicWidth';
import { isIosDevice } from '../utils/helperFunction';

const useStyle = () => {
  const dW = useDynamicWidth();
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: color.WHITE,
    },
    section: {
      flex: 1,
    },
    title: {
      color: color.BLACK,
      fontSize: textScale(23),
      fontFamily: font.LatoBold,
      marginBottom: moderateScaleVertical(8),
      marginTop: moderateScaleVertical(45),
      lineHeight: moderateScaleVertical(32),
    },
    heading2: {
      ...CommonStyles.tpp_h2,
      fontFamily: font.RobotoMedium,
      textAlign: 'center',
      color: color.S_GRAY_4,
    },
    skipButton: {
      ...CommonStyles.lotoBold16,
    },
    paginationDotStyle: {
      backgroundColor: color.S_GRAY_5,
      width: dW(8),
      height: dW(8),
      borderRadius: dW(4),
      marginLeft: moderateScale(3),
      marginRight: moderateScale(3),
    },
    activeDotStyle: {
      backgroundColor: color.P_PINK,
      width: dW(24),
      height: dW(8),
      borderRadius: dW(8),
      marginLeft: moderateScale(3),
      marginRight: moderateScale(3),
    },
    skipButtonArea: {
      width: dW(40),
      height: dW(40),
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: '45%',
    },
    wrapper: {
      flexDirection: 'row',
    },
    slide1: {
      flex: 1,
      alignItems: 'center',
      marginTop: moderateScaleVertical(20),
    },
    paginationStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 16,
    },
    nextButtonArea: {
      top: -moderateScaleVertical(130),
      marginLeft: '22%',
    },
    bgIcon: {
      width: isIosDevice() ? moderateScale(340) : moderateScale(355),
      height:
        isIosDevice() ? moderateScale(325) : moderateScaleVertical(340),
    },
  });
};

export default useStyle;
