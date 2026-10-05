import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {font} from '../../../assets/fonts/fontsConstant';
import {moderateScaleVertical} from '../../utils/responsiveSize';
import useDynamicWidth from '../../utils/useDynamicWidth';
const useStyle = () => {
  const dW = useDynamicWidth();

  return StyleSheet.create({
    rootContainer: {
      width: '100%',
      marginBottom: moderateScaleVertical(16),
    },

    container: {
      width: '100%',
      borderRadius: 30,
      minHeight: moderateScaleVertical(88),
      maxHeight: moderateScaleVertical(88),
      borderColor: color.S_GRAY_2,
      backgroundColor: color.WHITE,
      borderWidth: dW(0.8),
      alignItems: 'flex-end',
      paddingStart: dW(10),
      paddingTop: dW(10),
    },

    containerEmpty: {
      width: '100%',
      height: moderateScaleVertical(88),
      borderRadius: 30,
      borderColor: color.S_GRAY_2,
      backgroundColor: color.S_GRAY_1,
      borderWidth: dW(0.8),
      alignItems: 'flex-end',
      paddingStart: dW(10),
    },

    containerFocus: {
      width: '100%',
      minHeight: moderateScaleVertical(88),
      maxHeight: moderateScaleVertical(88),
      borderRadius: 30,
      borderColor: color.P_PINK,
      backgroundColor: color.WHITE,
      borderWidth: dW(0.8),
      paddingStart: dW(10),
      paddingTop: dW(10),
    },

    textInput: {
      flex: 1,
      paddingTop: dW(10),
      paddingLeft: dW(10),
      paddingEnd: dW(10),
      fontSize: dW(14),
      color: color.INPUT_TEXT,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      lineHeight: dW(18),
      fontFamily: font.RobotoRegular,
      placeholderTextColor: color.S_GRAY_4,
      underlineColorAndroid: color.INPUT_BOX_BOTTOM_LINE,
      maxHeight: moderateScaleVertical(80),
      top: dW(10),
    },
    textInputIOS: {
      flex: 1,
      paddingLeft: dW(10),
      fontSize: dW(15),
      paddingTop: dW(10),
      color: color.INPUT_TEXT,
      width: '100%',
      lineHeight: dW(18),
      fontFamily: font.RobotoRegular,
      placeholderTextColor: color.S_GRAY_4,
      underlineColorAndroid: color.INPUT_BOX_BOTTOM_LINE,
      maxHeight: moderateScaleVertical(95),
      top: dW(10),
    },
    textInputUnfocus: {
      flex: 1,
      paddingLeft: dW(10),
      fontSize: dW(12),
      color: color.INPUT_TEXT,
      lineHeight: dW(18),
      width: '100%',
      paddingTop: dW(10),
      fontFamily: font.RobotoRegular,
      placeholderTextColor: color.S_GRAY_4,
      underlineColorAndroid: color.INPUT_BOX_BOTTOM_LINE,
      maxHeight: moderateScaleVertical(95),
    },

    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      maxHeight: moderateScaleVertical(150),
      backgroundColor: 'red',
    },

    row: {
      alignItems: 'center',
      marginTop: dW(2),
      flexDirection: 'row',
    },

    titleStyles: {
      ...CommonStyles.tpp_p3,
      left: dW(10),
      color: color.S_GRAY_4,
    },

    error: {
      color: color.RED,
      fontSize: dW(8),
      marginStart: dW(2),
      fontFamily: font.RobotoMedium,
    },

    noError: {
      height: 0,
    },
    titleM: {
      color: color.P_PINK,
    },
    textLength: {
      ...CommonStyles.tpp_s1,
      top: dW(5),
      right: dW(20),
      color: color.S_GRAY_4,
    },
    titleContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      top: moderateScaleVertical(10),
      left: moderateScaleVertical(10),
      position: 'absolute',
    },
    titleMandetoryStyles: {
      position: 'absolute',
      marginBottom: dW(10),
      left: dW(10),
      fontSize: dW(10),
      color: color.P_PINK,
    },
  });
};

export default useStyle;
