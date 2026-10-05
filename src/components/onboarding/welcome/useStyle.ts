import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {font} from '../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/responsiveSize';
import useDynamicWidth from '../../utils/useDynamicWidth';

const useStyle = () => {
  const dW = useDynamicWidth();

  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: dW(20),
      height: '150%',
      backgroundColor: color.WHITE,
    },
    borderButtonText: {
      color: color.P_PINK,
      fontSize: textScale(18),
      fontFamily: font.LatoBold,
      lineHeight: moderateScaleVertical(24),
    },
    containerLogin: {
      width: moderateScale(330),
      height: moderateScaleVertical(60),
      paddingBottom: 0,
    },
    header: {
      marginEnd: dW(20),
      marginTop: moderateScaleVertical(80),
      marginBottom: moderateScaleVertical(60),
      marginStart: dW(20),
    },
    text: {
      fontSize: dW(22),
      lineHeight: dW(28),
      textAlign: 'center',
      fontFamily: font.LatoBold,
      color: color.BLACK,
    },
    row: {
      flexDirection: 'row',
      marginTop: moderateScaleVertical(36),
      alignItems: 'center',
    },
    continueas: {
      ...CommonStyles.latoBoldPink16,
      fontFamily: font.LatoMedium,
      marginLeft: dW(10),
      lineHeight: moderateScaleVertical(22),
      color: color.INPUT_TEXT,
    },
    guestuser: {
      ...CommonStyles.latoBoldPink16,
      color: color.P_PINK,
      lineHeight: moderateScaleVertical(22),
      textTransform: 'capitalize',
      marginLeft: -moderateScale(3),
    },
  });
};

export default useStyle;
