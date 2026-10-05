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
      minHeight: moderateScaleVertical(60),
      maxHeight: moderateScaleVertical(60),
      borderColor: color.S_GRAY_2,
      backgroundColor: color.WHITE,
      borderWidth: moderateScaleVertical(0.8),
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingEnd: moderateScaleVertical(35),
      paddingStart: moderateScaleVertical(10),
      paddingTop: moderateScaleVertical(12),
    },

    containerEmpty: {
      width: '100%',
      minHeight: moderateScaleVertical(60),
      borderRadius: 30,
      maxHeight: moderateScaleVertical(60),
      borderColor: color.S_GRAY_2,
      backgroundColor: color.S_GRAY_1,
      borderWidth: moderateScaleVertical(0.8),
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingEnd: moderateScaleVertical(20),
      paddingStart: moderateScaleVertical(10),
    },

    containerFocus: {
      width: '100%',
      minHeight: moderateScaleVertical(60),
      borderRadius: 30,
      maxHeight: moderateScaleVertical(60),
      borderColor: color.P_PINK,
      backgroundColor: color.WHITE,
      borderWidth: moderateScaleVertical(0.8),
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingEnd: moderateScaleVertical(35),
      paddingStart: moderateScaleVertical(10),
      paddingTop: moderateScaleVertical(12),
    },

    textInput: {
      flex: 1,
      paddingLeft: moderateScaleVertical(12),
      fontSize: dW(14),
      color: color.INPUT_TEXT,
      alignItems: 'center',
      justifyContent: 'center',
      lineHeight: moderateScaleVertical(20),
      fontFamily: font.RobotoRegular,
      marginBottom: moderateScaleVertical(2),
    },
    textInputIOS: {
      flex: 1,
      paddingLeft: moderateScaleVertical(12),
      fontSize: dW(15),
      lineHeight: moderateScaleVertical(20),
      color: color.INPUT_TEXT,
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: font.RobotoRegular,
      maxHeight: moderateScaleVertical(100),
      marginBottom: moderateScaleVertical(10),
      marginTop: moderateScaleVertical(8),
    },
    textInputUnfocus: {
      flex: 1,
      paddingLeft: moderateScaleVertical(12),
      fontSize: dW(14),
      marginBottom: moderateScaleVertical(6),
      color: color.INPUT_TEXT,
      alignItems: 'center',
      justifyContent: 'center',
      lineHeight: moderateScaleVertical(18),
      fontFamily: font.RobotoRegular,
    },

    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      maxHeight: moderateScaleVertical(150),
    },

    overlay: {
      position: 'absolute',
      maxHeight: moderateScaleVertical(150),
      minHeight: moderateScaleVertical(150),
      backgroundColor: 'red',
    },

    row: {
      alignItems: 'center',
      marginTop: moderateScaleVertical(2),
      flexDirection: 'row',
    },

    eye: {
      color: color.P_PINK,
      justifyContent: 'center',
      alignItems: 'center',
      textAlignVertical: 'center',
      width: moderateScaleVertical(56),
      height: moderateScaleVertical(40),
      position: 'absolute',
    },

    titleStyles: {
      position: 'absolute',
      marginBottom: moderateScaleVertical(10),
      left: moderateScaleVertical(13),
      lineHeight: moderateScaleVertical(16),
      fontSize: moderateScaleVertical(12),
      color: color.S_GRAY_4,
    },

    titleMandetoryStyles: {
      position: 'absolute',
      marginBottom: moderateScaleVertical(10),
      left: moderateScaleVertical(10),
      fontSize: moderateScaleVertical(10),
      color: color.P_PINK,
    },
    error: {
      color: color.RED,
      fontSize: moderateScaleVertical(8),
      marginStart: moderateScaleVertical(2),
      fontFamily: font.RobotoMedium,
      ...CommonStyles.capitalizedCase,
    },

    noError: {
      height: 0,
    },
    titleM: {
      color: color.P_PINK,
    },
    lengthText: {
      position: 'absolute',
      top: moderateScaleVertical(5),
      right: moderateScaleVertical(20),
    },
    titleContainer: {
      width: '100%',
      marginBottom: moderateScaleVertical(5),
    },
    titleContainerIos: {
      width: '100%',
      marginBottom: moderateScaleVertical(7),
    },
  });
};

export default useStyle;
