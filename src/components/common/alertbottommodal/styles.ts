import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {font} from '../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/responsiveSize';

export const styles = StyleSheet.create({
  modalHeading: {
    ...CommonStyles.tpp_h3,
    textTransform: 'capitalize',
    textAlign: 'center',
    lineHeight: moderateScaleVertical(24),
  },
  updatedDeshboardText: {
    ...CommonStyles.tpp_p2,
    color: color.BLACK,
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(20),
    textAlign: 'center',
    marginTop: moderateScaleVertical(24),
    marginBottom: moderateScaleVertical(16),
  },
  donotswitch: {
    ...CommonStyles.tpp_p2,
    color: color.S_GRAY_4,
    lineHeight: moderateScaleVertical(20),
    textAlign: 'center',
    marginBottom: moderateScaleVertical(40),
    marginLeft: moderateScale(8),
  },
  autoLogoutText: {
    ...CommonStyles.tpp_s3,
    color: color.BLACK,
    textTransform: 'capitalize',
    textAlign: 'center',
    marginBottom: moderateScaleVertical(12),
    lineHeight: moderateScaleVertical(24),
  },
  headingView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: moderateScaleVertical(5),
  },
  timertext: {
    ...CommonStyles.tpp_h2,
    color: color.P_PINK,
    marginBottom: moderateScaleVertical(40),
    textTransform: 'capitalize',
    textAlign: 'center',
    lineHeight: moderateScaleVertical(24),
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
  logoutButtonText: {
    color: color.P_PINK,
    fontFamily: font.LatoBold,
    textTransform: 'uppercase',
    marginVertical: moderateScaleVertical(14),
    fontSize: textScale(14),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
