import {  StyleSheet } from 'react-native';
import { color } from '../../../../assets/colorConstant';
import { CommonStyles } from '../../../../assets/commonStyles';
import { font } from '../../../../assets/fonts/fontsConstant';
import { moderateScaleVertical } from '../../../utils/responsiveSize';
import useDynamicWidth from '../../../utils/useDynamicWidth';
import { isIosDevice } from '../../../utils/helperFunction';

const useStyle = () => {
  const dW = useDynamicWidth();
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: dW(20),
      height: '100%',
      backgroundColor: color.WHITE,
    },
    rootContainer: {
      flex: 1,
      flexGrow: 1,
      backgroundColor: '#f5faf5',
    },

    divider: {
      marginTop: moderateScaleVertical(65),
    },
    headerText: {
      color: '#1b1714',
      fontSize: dW(26),
      marginTop: dW(15),
      marginBottom: dW(15),
      fontFamily: 'roboto_medium',
    },

    inputHeaderLabel: {
      color: '#1b1714',
      fontFamily: font.RobotoRegular,
      fontSize: dW(12),
      marginTop: dW(10),
    },

    logo: {
      marginBottom: dW(25),
      marginTop: dW(25),
    },

    action: {
      flexDirection: 'row',
      marginTop: dW(10),
      alignItems: 'center',
      paddingBottom: dW(5),
    },

    forgotContainer: {
      flexDirection: 'row',
      marginTop: dW(15),
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },

    dontHaveAc: {
      color: '#1b1714',
      marginTop: dW(15),
      marginEnd: dW(5),
      fontFamily: font.RobotoRegular,
    },

    forgotText: {
      color: '#3ea947',
      marginTop: dW(12),
      fontFamily: font.RobotoRegular,
    },
    actionError: {
      flexDirection: 'row',
      marginTop: dW(10),
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: dW(5),
    },
    textInput: {
      flex: 1,
      marginTop: isIosDevice() ? 0 : -12,
      paddingLeft: dW(10),
      fontSize: dW(12),
      color: '#1b1714',
      fontFamily: font.RobotoRegular,
    },
    errorMsg: {
      color: '#FF0000',
      fontSize: dW(14),
    },

    forgotPassword: {
      width: '100%',
      alignItems: 'flex-end',
      marginBottom: moderateScaleVertical(80),
    },
    row: {
      flexDirection: 'row',
      marginTop: dW(30),
      fontFamily: font.LatoRegular,
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
    newLabel: {
      ...CommonStyles.tpp_h6,
      lineHeight: moderateScaleVertical(22),
    },
    link: {
      ...CommonStyles.latoBoldPink16,
      color: color.P_PINK,
      marginEnd: dW(5),
      lineHeight: moderateScaleVertical(22),
    },
  });
};

export default useStyle;
