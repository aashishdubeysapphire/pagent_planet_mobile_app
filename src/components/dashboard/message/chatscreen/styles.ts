import { Dimensions, StyleSheet } from 'react-native';
import { color } from '../../../../assets/colorConstant';
import { CommonStyles } from '../../../../assets/commonStyles';
import { font } from '../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../utils/responsiveSize';
import { isIosDevice } from '../../../utils/helperFunction';
export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.WHITE,
    flex: 1,
  },
  customComposerView: {
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(31),
    marginTop: moderateScaleVertical(12),
    backgroundColor: color.WHITE,
    alignItems: 'center'
  },
  attachIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(6),
    marginRight: moderateScale(6),
  },
  giftedChatView: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  timeText: {
    ...CommonStyles.tpp_s1,
    color: color.S_GRAY_4,
  },
  timeTextR: {
    ...CommonStyles.tpp_s1,
    color: color.WHITE,
  },
  avatarImgView: {
    backgroundColor: color.S_GRAY_2,
    borderRadius: 100,
    height: moderateScaleVertical(28),
    width: moderateScale(28),
    marginLeft: moderateScale(8),
  },
  renderAvatarImg: {
    height: moderateScaleVertical(28),
    width: moderateScale(28),
    borderRadius: 100,
  },
  headingText: {
    ...CommonStyles.tpp_s1,
    textAlign: 'center',
    color: color.S_GRAY_4,
  },
  renderDayView: {
    // marginBottom: moderateScaleVertical(12),
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: color.S_GRAY_1,
    borderWidth: 1,
    borderColor: color.S_GRAY_2,
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScaleVertical(8),
  },
  leftBubble: {
    backgroundColor: color.S_PINK,
    borderRadius: 12,
  },
  rightBubble: {
    backgroundColor: color.P_PINK,
    borderRadius: 12,
    marginRight: moderateScale(8)
  },
  p: {
    ...CommonStyles.tpp_p3,
    lineHeight: moderateScaleVertical(18),
    marginHorizontal: moderateScale(12),
    marginTop: moderateScaleVertical(8),
    marginBottom: moderateScaleVertical(8),
  },
  renderBubbleView: {},
  orderIdView: {
    backgroundColor: color.S_GRAY_1,
    height: moderateScaleVertical(36),
    justifyContent: 'center',
  },
  orderId: {
    ...CommonStyles.tpp_s2,
    color: color.P_PINK,
    textAlign: 'center',
    lineHeight: moderateScaleVertical(16),
  },
  textInputStyle: {
    // marginTop: moderateScaleVertical(0.7),
    minHeight: moderateScaleVertical(44),
    paddingLeft: moderateScale(16),
    paddingRight: moderateScale(40),
    paddingTop: 10,
    marginLeft: moderateScale(8),
    marginRight: moderateScale(16),
    borderRadius: 25,
    borderWidth: 1,
    borderColor: color.S_GRAY_2,
    fontFamily: font.RobotoRegular,
    color: color.P_GRAY_BLACK_1,
    fontSize: textScale(14),
    lineHeight: moderateScaleVertical(20),
    alignSelf: 'center'
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(20),
    textAlign: 'center',
    marginBottom: 'auto',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
  },
  noReplyStyle: {
    ...CommonStyles.tpp_h5,
    fontSize: textScale(14),
    marginTop: moderateScaleVertical(24),
    marginBottom: moderateScaleVertical(18),
    minHeight: moderateScaleVertical(44),
    marginLeft: moderateScale(12),
    color: color.S_GRAY_4,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: moderateScaleVertical(20),
  },
  renderLoading: { alignSelf: 'center' },
  image: {
    backgroundColor: color.S_GRAY_2,
    height: moderateScaleVertical(44),
    width: moderateScale(44),
    borderRadius: 100,
    marginLeft: moderateScale(16),
    // marginTop: moderateScaleVertical(12),
    alignSelf: (isIosDevice() ? 'center' : 'auto')
  },
  a: {
    color: color.P_PINK,
    fontFamily: font.RobotoMedium,
    textDecorationLine: 'underline',
    lineHeight: moderateScaleVertical(18),
  },
  renderContainerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  renderSendView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(6),
    marginLeft: moderateScale(6),
  },
  renderSendDisabled: {
    opacity: 0.4,
  },
  renderLoaderView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(6),
    marginLeft: moderateScale(6),
  },
  footerText: {
    textAlign: 'center',
    ...CommonStyles.tpp_s1,
    fontSize: textScale(10),
    marginLeft: moderateScale(4),
  },
  footer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: moderateScaleVertical(4),
    // paddingBottom: moderateScaleVertical(65),
  },
  footer1: {
    height: moderateScaleVertical(50),
  },
  composerView: {
    flex: 1,
    borderColor: color.WHITE,
  },
  inputToolbarContainer: {
    borderTopWidth: 0,
    backgroundColor: color.WHITE,
    paddingTop: moderateScaleVertical(2),
    paddingBottom: moderateScaleVertical(6),
    minHeight: moderateScaleVertical(68),
  },
  inputToolbarPrimary: {
    alignItems: 'center',
    paddingVertical: moderateScaleVertical(4),
    paddingHorizontal: 0,
  },
  composerRoot: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScaleVertical(6),
    backgroundColor: color.WHITE,
  },

  inputWrapper: {
    flex: 1,
    marginHorizontal: moderateScale(6),
    borderRadius: moderateScale(20),
    backgroundColor: color.WHITE,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScaleVertical(2),
    minHeight: moderateScaleVertical(48),
    borderWidth: 1,
    borderColor: color.S_GRAY_2,
  },

  textInput: {
    fontSize: textScale(14),
    lineHeight: moderateScaleVertical(20),
    minHeight: moderateScaleVertical(44),
    maxHeight: moderateScaleVertical(120),
    color: color.P_GRAY_BLACK_1,
    fontFamily: font.RobotoRegular,
    paddingTop: moderateScaleVertical(6),
    paddingBottom: moderateScaleVertical(8),
    paddingHorizontal: moderateScale(4),
    textAlignVertical: 'top',
  },
  renderComposerView: {
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(31),
    marginTop: moderateScaleVertical(12),
    backgroundColor: color.WHITE,
  },
  loader: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  audioHeading: {
    ...CommonStyles.tpp_h5,
    fontSize: textScale(13),
    lineHeight: moderateScaleVertical(20),
    marginBottom: moderateScaleVertical(8),
  },
  audioName: {
    ...CommonStyles.tpp_p3,
    marginLeft: moderateScale(8),
    lineHeight: moderateScale(18),
    color: color.WHITE,
  },
  uploadImageInnerVIew: {
    marginRight: moderateScale(10),
    marginLeft: moderateScale(12),
  },
  clickable: {
    marginBottom: moderateScaleVertical(8),
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: moderateScale(12),
    backgroundColor: color.TRANSPARENT,
  },
});
export const stylesR = StyleSheet.create({
  p: {
    ...CommonStyles.tpp_p3,
    lineHeight: moderateScaleVertical(18),
    marginHorizontal: moderateScale(12),
    marginTop: moderateScaleVertical(8),
    marginBottom: moderateScaleVertical(4),
    color: color.WHITE,
  },
  a: {
    color: color.WHITE,
    fontFamily: font.RobotoMedium,
    lineHeight: moderateScaleVertical(18),
    textDecorationLine: 'underline',
  },
});
