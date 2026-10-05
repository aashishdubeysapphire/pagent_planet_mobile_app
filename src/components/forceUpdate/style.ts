import { StyleSheet } from 'react-native';
import { CommonStyles } from '../../assets/commonStyles';
import { font } from '../../assets/fonts/fontsConstant';
import { moderateScaleVertical } from '../utils/responsiveSize';
import useDynamicWidth from '../utils/useDynamicWidth';
import { color } from '../../assets/colorConstant';

export const useStyle = () => {
  const dW = useDynamicWidth();

  return StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: color.WHITE,
    },

    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: dW(24),
      backgroundColor: color.WHITE,
    },

    logo: {
      marginBottom: moderateScaleVertical(20),
    },
    headerText: {
      color: '#1b1714',
      fontSize: dW(26),
      marginTop: dW(15),
      marginBottom: dW(15),
      fontFamily: 'roboto_medium',
    },
    divider: {
      marginTop: moderateScaleVertical(40),
    },

    title: {
      ...CommonStyles.tpp_h3,
      textAlign: 'center',
      color: '#1b1714',
      marginTop: dW(10),
      marginBottom: dW(10),
    },

    message: {
      textAlign: 'center',
      color: '#1b1714',
      fontSize: dW(14),
      fontFamily: font.RobotoRegular,
      lineHeight: moderateScaleVertical(20),
      marginBottom: moderateScaleVertical(35),
      paddingHorizontal: dW(10),
    },

    buttonContainer: {
      width: '100%',
      marginTop: moderateScaleVertical(10),
    },

    skipContainer: {
      marginTop: moderateScaleVertical(15),
      alignItems: 'center',
    },

    skipText: {
      ...CommonStyles.latoBoldPink16,
      color: color.P_PINK,
      lineHeight: moderateScaleVertical(22),
    },

    versionText: {
      marginTop: moderateScaleVertical(15),
      fontSize: dW(12),
      color: '#888',
      fontFamily: font.RobotoRegular,
    },
  });
};

export default useStyle;