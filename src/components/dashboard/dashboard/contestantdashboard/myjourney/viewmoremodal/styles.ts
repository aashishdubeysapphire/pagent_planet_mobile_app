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
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.WHITE,
    borderRadius: moderateScale(30),
  },
  dateTag: {
    borderWidth: 1,
    borderRadius: 14,
    marginTop: moderateScaleVertical(12),
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: moderateScale(16),
  },
  dateText: {
    ...CommonStyles.robotoMedium14,
    paddingVertical: moderateScaleVertical(4),
    marginHorizontal: moderateScale(12),
    fontSize: textScale(10),
    lineHeight: moderateScaleVertical(12),
  },
  crossIcon: {
    marginLeft: 'auto',
    paddingRight: moderateScale(16),
  },

  infoViewContainer: {
    flexDirection: 'row',
  },
  duration: {
    color: color.WHITE,
    fontFamily: font.RobotoRegular,
    fontSize: textScale(6),
    alignSelf: 'center',
    marginHorizontal: moderateScale(10),
  },
  durationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(15),
  },
  durationRow1: {
    ...CommonStyles.tpp_s2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: moderateScale(5),
  },
  linkTitle: {
    ...CommonStyles.tpp_h5,
    lineHeight: moderateScaleVertical(16),
    color: color.P_PINK,
    maxWidth: '95%',
    marginBottom: moderateScaleVertical(8),
  },
  infoText1: {
    ...CommonStyles.tpp_s1,
    lineHeight: moderateScaleVertical(12),
    color: color.S_GRAY_3,
    marginBottom: moderateScaleVertical(16),
  },
  infoText2: {
    ...CommonStyles.tpp_s2,
    fontSize: textScale(12),
    marginBottom: moderateScaleVertical(4),
    lineHeight: moderateScaleVertical(16),
    color: color.UPCOMING,
  },
  uploadImageView: {
    marginVertical: moderateScaleVertical(8),
  },
  duration1: {
    color: color.WHITE,
    fontSize: textScale(10),
    fontFamily: font.RobotoRegular,
  },
  iconRow: {
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(8),
    marginRight: moderateScale(46),
    justifyContent: 'space-between',
  },
  toDoHeading: {
    ...CommonStyles.robotoMedium16,
    marginVertical: moderateScaleVertical(12),
    lineHeight: moderateScaleVertical(22),
  },
  uploadedImageView: {
    marginTop: moderateScaleVertical(8),
    flexDirection: 'column',
  },
  toDoText: {
    ...CommonStyles.tpp_p3,
    color: color.INPUT_TEXT,
    lineHeight: moderateScaleVertical(18),
    minWidth: '100%',
    maxWidth: '100%',
  },
  infoText: {
    ...CommonStyles.tpp_h5,
    marginHorizontal: moderateScale(8),
    lineHeight: moderateScaleVertical(16),
  },
  infoView: {
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(8),
  },
  container: {
    width: '100%',
    height: 'auto',
    maxHeight: moderateScaleVertical(580),
    paddingHorizontal: moderateScale(16),
    marginBottom: moderateScaleVertical(20),
  },
  shadowView: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: moderateScaleVertical(100),
    borderColor: color.SHADOW_COLOR_LIGHT,
    borderWidth: 1.5,
  },
  containerDelete: {
    flex: 0.5,
    borderRadius: 30,
    marginRight: moderateScale(8),
    height: moderateScaleVertical(48),
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: moderateScaleVertical(8),
  },
  borderButtonText: {
    color: color.WHITE,
    fontSize: textScale(14),
    fontFamily: font.LatoBold,
    lineHeight: moderateScaleVertical(20),
  },

  containerConfirm: {
    flex: 0.5,
    backgroundColor: color.P_PINK,
    borderColor: color.P_PINK,
    borderWidth: 1,
    borderRadius: 30,
    height: moderateScaleVertical(48),
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentView: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScaleVertical(16),
    paddingBottom: moderateScaleVertical(200),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: color.WHITE,
    marginTop: moderateScaleVertical(2),
    flexDirection: 'row',
  },
  TodoInfo: {
    ...CommonStyles.tpp_h5,
    color: color.BLACK,
    marginLeft: moderateScale(8),
    lineHeight: moderateScaleVertical(16),
  },
});
