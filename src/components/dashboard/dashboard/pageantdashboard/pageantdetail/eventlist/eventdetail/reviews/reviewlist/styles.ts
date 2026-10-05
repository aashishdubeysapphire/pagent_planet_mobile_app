import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../../assets/commonStyles';
import {font} from '../../../../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  headerArea: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  reviewsContainer: {
    padding: moderateScale(16),
    borderRadius: moderateScale(20),
    backgroundColor: color.WHITE,
    borderWidth: 1,
    borderColor: color.S_GRAY_2,
    marginHorizontal: moderateScale(16),
    marginBottom: moderateScaleVertical(16),
  },
  detailsSection: {
    flexDirection: 'row',
  },
  imageSection: {
    width: moderateScaleVertical(50),
    height: moderateScaleVertical(50),
    justifyContent: 'center',
  },
  nameAndReview: {
    flexDirection: 'column',
    marginLeft: moderateScale(8),
    justifyContent: 'center',
  },
  reviewsBox: {
    width: '100%',
    borderWidth: 1,
    paddingTop: moderateScale(12),
    marginVertical: moderateScaleVertical(12),
    borderBottomColor: color.S_GRAY_2,
    borderTopColor: color.S_GRAY_2,
    borderLeftColor: color.TRANSPARENT,
    borderRightColor: color.TRANSPARENT,
  },
  reviewerNameStyles: {
    ...CommonStyles.robotoMedium14,
    marginBottom: moderateScaleVertical(5),
    width: moderateScale(174),
  },
  reviewsLabel: {
    ...CommonStyles.tpp_s2,
    // textAlign:"right",
    marginBottom: moderateScaleVertical(5),
  },
  horizontalView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScaleVertical(8),
  },
  descriptionLabel: {
    ...CommonStyles.tpp_p3,
    color: color.INPUT_TEXT,
    fontWeight: '400',
    lineHeight: moderateScaleVertical(18),
  },
  viewMoreLabel: {
    ...CommonStyles.tpp_s1,
    color: color.P_PINK,
  },
  commenterNameStyles: {
    ...CommonStyles.tpp_s1,
    color: color.INPUT_TEXT,
  },
  replyView: {
    flexDirection: 'column',
    marginLeft: moderateScale(8),
    flex: 1,
    justifyContent: 'center',
  },
  replyImageSection: {
    width: moderateScaleVertical(30),
    height: moderateScaleVertical(30),
    justifyContent: 'center',
  },
  replyContainer: {
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(30),
    marginTop: moderateScaleVertical(-2),
    backgroundColor: color.WHITE,
    borderWidth: 1,
    borderColor: color.S_GRAY_2,
  },
  aboutValueText: {
    ...CommonStyles.tpp_p3,
    color: color.INPUT_TEXT,
    minHeight: moderateScaleVertical(10),
    paddingTop: moderateScaleVertical(-2),
    paddingBottom: moderateScaleVertical(-20),
    maxHeight: moderateScaleVertical(110),
    lineHeight: moderateScaleVertical(18),
  },
  saveLabel: {
    ...CommonStyles.latoBoldBlack12,
    color: color.P_PINK,
  },
  viewMoreArea: {
    marginTop: moderateScaleVertical(8),
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  textInputPlaceholderStyles: {
    ...CommonStyles.tpp_s1,
    fontWeight: '400',
  },
  textInputStyles: {
    ...CommonStyles.tpp_p3,
    color: color.INPUT_TEXT,
    fontWeight: '400',
    lineHeight: moderateScaleVertical(18),
  },
  isEditedLabel: {
    ...CommonStyles.tpp_s5,
    color: color.S_GRAY_4,
    marginTop: moderateScaleVertical(8),
  },
  bottomArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor:'red',
  },
  row: {
    alignItems: 'center',
    marginTop: moderateScaleVertical(2),
    flexDirection: 'row',
  },
  error: {
    color: color.RED,
    fontSize: textScale(9),
    marginStart: moderateScale(2),
    fontFamily: font.RobotoMedium,
  },
  editTouchableArea: {
    height: moderateScaleVertical(19),
    justifyContent: 'center',
    marginBottom: moderateScaleVertical(8),
  },
  editDeleteView: {
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(8),
    alignItems: 'flex-end',
  },
  imageNameView: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(12),
  },
});
