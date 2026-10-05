import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {font} from '../../../../../../assets/fonts/fontsConstant';
import {
  moderateScaleVertical,
  textScale,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
    selectedText: {
      ...CommonStyles.tpp_p3,
      fontWeight: '400',
      textAlign: 'center',
      marginBottom: moderateScaleVertical(20),
      lineHeight: moderateScaleVertical(18),
      color: color.INPUT_TEXT,
    },
    containerConfirm: {
      borderColor: color.P_PINK,
      borderWidth: 1,
      borderRadius: 30,
      marginEnd: moderateScaleVertical(20),
      marginStart: moderateScaleVertical(20),
    },
    borderButtonText: {
      ...CommonStyles.tpp_p3,
      fontWeight: '700',
      color: color.P_PINK,
      fontSize: textScale(12),
      fontFamily: font.LatoRegular,
      textTransform: 'uppercase',
      lineHeight: moderateScaleVertical(18),
      marginVertical: moderateScaleVertical(8),
      textAlign: 'center',
    },
  });
