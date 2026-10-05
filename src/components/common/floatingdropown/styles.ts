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
      marginBottom: moderateScaleVertical(16),
    },

    container: {
      borderRadius: 30,
      borderColor: color.S_GRAY_2,
      minHeight: moderateScaleVertical(60),
      maxHeight: moderateScaleVertical(60),
      backgroundColor: color.WHITE,
      alignItems: 'flex-end',
      borderWidth: dW(0.8),
      justifyContent: 'center',
      paddingEnd: dW(35),
      paddingStart: dW(10),
      paddingTop: dW(12),
    },

    containerEmpty: {
      width: '100%',
      minHeight: moderateScaleVertical(60),
      maxHeight: moderateScaleVertical(60),
      borderRadius: 30,
      borderColor: color.S_GRAY_2,
      backgroundColor: color.S_GRAY_1,
      alignItems: 'flex-end',
      justifyContent: 'center',
      borderWidth: dW(0.8),
      paddingEnd: dW(35),
      paddingStart: dW(10),
    },

    focusStyle: {
      width: '100%',
      maxHeight: moderateScaleVertical(60),
      minHeight: moderateScaleVertical(60),
      borderRadius: 30,
      borderColor: color.S_GRAY_2,
      backgroundColor: color.WHITE,
      borderWidth: dW(0.8),
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingEnd: dW(35),
      paddingStart: dW(10),
      paddingTop: dW(10),
    },

    textInput: {
      flex: 1,
      paddingHorizontal: dW(12),
      fontSize: dW(14),
      justifyContent: 'center',
      color: color.INPUT_TEXT,
      alignItems: 'center',
      lineHeight: dW(18),
      fontFamily: font.RobotoRegular,
      underlineColorAndroid: color.INPUT_BOX_BOTTOM_LINE,
      marginBottom: dW(2),
      placeholderTextColor: color.S_GRAY_4,
    },
    textInputIOS: {
      flex: 1,
      lineHeight: dW(18),
      paddingHorizontal: dW(12),
      fontSize: dW(15),
      color: color.INPUT_TEXT,
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: font.RobotoRegular,
      marginBottom: dW(10),
      placeholderTextColor: color.S_GRAY_4,
      underlineColorAndroid: color.INPUT_BOX_BOTTOM_LINE,
      maxHeight: moderateScaleVertical(100),
      marginTop: dW(8),
    },
    textInputUnfocus: {
      flex: 1,
      color: color.INPUT_TEXT,
      paddingHorizontal: dW(12),
      fontSize: dW(14),
      marginBottom: dW(6),
      alignItems: 'center',
      placeholderTextColor: color.S_GRAY_4,
      justifyContent: 'center',
      lineHeight: dW(18),
      fontFamily: font.RobotoRegular,
      underlineColorAndroid: color.INPUT_BOX_BOTTOM_LINE,
    },

    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    row: {
      alignItems: 'center',
      marginTop: dW(2),
      flexDirection: 'row',
    },

    arrowContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      textAlignVertical: 'center',
      width: dW(65),
      position: 'absolute',
    },

    titleStyles: {
      fontSize: dW(10),
      left: dW(13),
      color: color.S_GRAY_4,
      position: 'absolute',
      marginBottom: dW(10),
      ...CommonStyles.capitalizedCase,
    },

    titleMandetoryStyles: {
      fontSize: dW(10),
      position: 'absolute',
      marginBottom: dW(10),
      left: dW(10),
      color: color.P_PINK,
    },
    error: {
      color: color.RED,
      marginStart: dW(2),
      fontSize: dW(8),
      fontFamily: font.RobotoMedium,
    },

    noError: {
      height: 0,
    },

    lengthText: {
      top: dW(5),
      position: 'absolute',
      right: dW(20),
    },
    titleContainerStyle: {
      width: '100%',
    },
  });
};

export default useStyle;
