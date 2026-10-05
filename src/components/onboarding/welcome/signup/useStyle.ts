import { StyleSheet } from 'react-native';
import { color } from '../../../../assets/colorConstant';
import { CommonStyles } from '../../../../assets/commonStyles';
import { font } from '../../../../assets/fonts/fontsConstant';
import { moderateScaleVertical } from '../../../utils/responsiveSize';
import useDynamicWidth from '../../../utils/useDynamicWidth';
const useStyle = () => {
  const dW = useDynamicWidth();

  return StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingStart: dW(20),
      paddingEnd: dW(20),
      paddingVertical: moderateScaleVertical(12),
      backgroundColor: color.WHITE,
    },
    skipContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'flex-end',
    },
    skip: {
      ...CommonStyles.latoBoldPink16,
      lineHeight: moderateScaleVertical(22),
    },
    row: {
      flexDirection: 'row',
      marginTop: moderateScaleVertical(26),
      alignItems: 'center',
    },
    divider: {
      marginTop: moderateScaleVertical(16),
    },
    agreeContainer: {
      width: '100%',
      flexDirection: 'row',
      marginTop: moderateScaleVertical(8),
      marginBottom: moderateScaleVertical(24),
      alignItems: 'center',
    },

    agreeText: {
      fontSize: dW(14),
      marginLeft: dW(10),
      fontFamily: font.LatoRegular,
      color: color.INPUT_TEXT,
      lineHeight: moderateScaleVertical(22)
    },

    alreadyAC: {
      color: color.S_GRAY_4,
      fontSize: dW(14),
      marginLeft: dW(5),
      lineHeight: dW(20),
      fontFamily: font.LatoRegular,
    },

    link: {
      ...CommonStyles.latoBoldPink16,
      color: color.P_PINK,
      textTransform: 'capitalize',
      lineHeight: moderateScaleVertical(22)
    },

    dontHaveAc: {
      ...CommonStyles.latoBoldPink16,
      color: color.P_PINK,
      marginEnd: moderateScaleVertical(5),
      lineHeight: moderateScaleVertical(22),
    },
  });
};

export default useStyle;
