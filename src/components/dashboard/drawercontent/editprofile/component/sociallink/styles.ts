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
      borderWidth: 1,
      borderColor: color.S_GRAY_2,
      borderRadius: moderateScale(30),
      marginBottom: moderateScaleVertical(16),
      backgroundColor: color.WHITE,
      paddingVertical: moderateScaleVertical(14),
      paddingHorizontal: moderateScale(24),
    },
    heading: {
      ...CommonStyles.tpp_h4,
      marginBottom: 'auto',
      marginTop: 'auto',
      marginLeft: moderateScale(12),
    },
    addLinkText: {
      ...CommonStyles.latoBoldPink14,
      marginLeft: 'auto',
      marginBottom: 'auto',
      marginTop: 'auto',
    },
    textInput: {
      ...CommonStyles.tpp_p3,
      flex: 1,
      backgroundColor: color.S_GRAY_1,
      borderColor: color.S_GRAY_E1,
      borderWidth: 1,
      borderRadius: moderateScale(30),
      marginTop: moderateScaleVertical(16),
      paddingHorizontal: moderateScale(17),
      height: moderateScaleVertical(50),
    },
    Dots: {
      marginLeft: 'auto',
      marginBottom: 'auto',
      marginTop: 'auto',
    },
    finalStateView: {
      width: moderateScale(80),
      backgroundColor: color.S_GRAY_1,
      marginLeft: 'auto',
      marginBottom: 'auto',
      marginTop: 'auto',
      borderRadius: 30,
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: color.S_GRAY_E1,
      paddingTop: moderateScaleVertical(7),
      paddingBottom: moderateScaleVertical(7),
      borderRightColor: 'red',
    },
    icons: {
      marginLeft: 'auto',
      marginBottom: 'auto',
      marginTop: 'auto',
      marginRight: 'auto',
    },
    mainIcon: {
      marginBottom: 'auto',
      marginTop: 'auto',
    },
    error: {
      color: color.RED,
      fontSize: textScale(10),
      marginStart: moderateScale(2),
      fontFamily: font.RobotoMedium,
    },

    noError: {
      height: 0,
    },
    row: {
      flexDirection: 'row',
    },
  });
