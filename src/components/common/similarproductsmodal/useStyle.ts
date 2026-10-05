import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {font} from '../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/responsiveSize';
const useStyle = () => {
  return StyleSheet.create({
    modalHeading: {
      ...CommonStyles.tpp_h3,
      textTransform: 'capitalize',
      textAlign: 'center',
      lineHeight: moderateScaleVertical(24),
    },
    similarProductsList: {
       height:'auto',
    },
    colorName: {
      ...CommonStyles.tpp_p4,
      textAlign: 'left',
    },
    colorRound: {
      borderRadius: moderateScale(100),
      width: moderateScale(36),
      backgroundColor: 'red',
      height: moderateScaleVertical(36),
      marginRight: moderateScale(16),
      marginTop: moderateScaleVertical(8),
      marginBottom: moderateScaleVertical(8),
    },
    crossIcon: {
      marginLeft: 'auto',
    },
    modaltext: {
      ...CommonStyles.tpp_p2,
      color: color.BLACK,
      textTransform: 'capitalize',
      lineHeight: moderateScaleVertical(20),
      textAlign: 'center',
      marginTop: moderateScaleVertical(24),
      marginBottom: moderateScaleVertical(16),
    },
    logouttext: {
      ...CommonStyles.tpp_s3,
      color: color.BLACK,
      textTransform: 'capitalize',
      textAlign: 'center',
      marginBottom: moderateScaleVertical(12),
      lineHeight: moderateScaleVertical(24),
    },
    dontswitch: {
      ...CommonStyles.tpp_p2,
      color: color.S_GRAY_4,
      lineHeight: moderateScaleVertical(20),
      textAlign: 'center',
      marginBottom: moderateScaleVertical(40),
      marginLeft: moderateScale(8),
    },
    timertext: {
      ...CommonStyles.tpp_h2,
      color: color.P_PINK,
      marginBottom: moderateScaleVertical(40),
      textTransform: 'capitalize',
      textAlign: 'center',
      lineHeight: moderateScaleVertical(24),
    },
    headingView: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: moderateScaleVertical(24),
      alignItems: 'center',
    },
    switchRow: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    icon: {
      marginTop: moderateScaleVertical(3),
    },
    containerConfirm: {
      height: moderateScaleVertical(40),
      width: moderateScale(230),
      alignSelf: 'center',
    },

    borderButtonText: {
      color: color.P_PINK,
      fontFamily: font.LatoBold,
      textTransform: 'uppercase',
      marginVertical: moderateScaleVertical(14),
      fontSize: textScale(14),
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
};

export default useStyle;
