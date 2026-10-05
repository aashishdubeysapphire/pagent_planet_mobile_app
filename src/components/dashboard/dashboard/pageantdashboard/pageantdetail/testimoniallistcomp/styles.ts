import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {font} from '../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginBottom: moderateScaleVertical(16),
      marginHorizontal: moderateScale(16),
      paddingVertical: moderateScaleVertical(16),
      paddingHorizontal: moderateScale(16),
      borderRadius: moderateScale(20),
      borderColor: color.S_GRAY_2,
      borderWidth: 1,
    },
    circleContainer: {
      width: moderateScaleVertical(60),
      height: moderateScaleVertical(60),
      borderColor: color.S_GRAY_2,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: moderateScaleVertical(60),
      marginEnd: moderateScaleVertical(12),
      marginBottom: moderateScaleVertical(8),
    },

    showData: {
      flexDirection: 'row',
    },
    titleView: {
      width: '78%',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    title: {
      ...CommonStyles.tpp_h5,
      marginBottom: moderateScaleVertical(4),

      lineHeight: moderateScaleVertical(20),
    },
    designation: {
      marginBottom: moderateScaleVertical(8),
      fontSize: textScale(10),
      color: color.P_PINK,
      lineHeight: moderateScaleVertical(14),
    },
    viewMore: {
      textAlign: 'right',
      ...CommonStyles.tpp_s1,
      color: color.P_PINK,
      lineHeight: moderateScaleVertical(16),
      fontSize: textScale(10),
      marginTop: moderateScaleVertical(4),
    },
    infoLabel: {
      fontSize: textScale(10),
      fontFamily: font.RobotoRegular,
      color: color.INPUT_TEXT,
    },
  });
