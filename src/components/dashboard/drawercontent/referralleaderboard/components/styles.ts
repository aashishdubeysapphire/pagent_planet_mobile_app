import {Dimensions, StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../utils/helperFunction';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  linearGradientStyles: {
    paddingVertical: moderateScaleVertical(24),
    paddingHorizontal: moderateScale(16),
    width: Dimensions.get('window').width,
    height: 'auto',
  },
  wrapper: {
    flex: 1,
    marginTop: moderateScaleVertical(20),
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    width: Dimensions.get('window').width - moderateScale(86),
  },
  column: {
    flexDirection: 'column',
    marginLeft: moderateScale(16),
  },

  eventName: {
    ...CommonStyles.tpp_s3,
    textAlign: 'center',
    marginTop: moderateScaleVertical(16),
  },
  wrapperPageant: {
    flex: 1,
    marginTop: moderateScaleVertical(13),
  },
  contestantName: {
    ...CommonStyles.tpp_h5,
    fontSize: isIosDevice() ? textScale(13) : textScale(14),

    lineHeight: moderateScaleVertical(20),
  },
  referralCount: {
    ...CommonStyles.tpp_h5,
    lineHeight: moderateScaleVertical(20),
    fontSize: textScale(14),
    color: color.P_PINK,
    textAlign: 'right',
  },

  referral: {
    ...CommonStyles.tpp_s2,
    lineHeight: moderateScaleVertical(16),
    fontSize: textScale(12),
    color: color.S_GRAY_4,
  },
  heading: {
    ...CommonStyles.tpp_s3,
    alignSelf: 'center',
    marginTop: moderateScaleVertical(16),
    color: color.P_PINK,
  },
  title: {
    ...CommonStyles.tpp_s3,
    marginTop: moderateScaleVertical(16),
    lineHeight: moderateScaleVertical(22),
    marginLeft: moderateScale(16),
  },
  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: moderateScaleVertical(18),
  },
  gap: {
    marginTop: moderateScaleVertical(16),
  },
  noRecord: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height * 0.6,
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(20),
    textAlign: 'center',
    marginBottom: 'auto',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
  },
  bottomSection: {
    flexDirection: 'row',
    height: moderateScaleVertical(40),
    width: moderateScale(140),
    alignItems: 'center',
    marginLeft: moderateScale(8),
    backgroundColor: color.WHITE,
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
    justifyContent: 'center',
    borderColor: color.S_GRAY_2,
    top: moderateScaleVertical(194),
    borderWidth: 1,
  },
  options: {
    ...CommonStyles.tpp_s2,
    fontWeight: '500',
    marginLeft: moderateScale(8),
  },

  imageSection: {
    marginLeft: moderateScale(16),
    marginRight: moderateScale(8),
    marginVertical: moderateScaleVertical(12),
  },
  titleSection: {
    width: moderateScale(160),
    alignItems: 'center',
    paddingHorizontal: moderateScale(8),
    backgroundColor: 'transparent',
    paddingTop: moderateScaleVertical(2),
  },
  bottomArea: {
    width: moderateScale(154),
    marginRight: moderateScale(12),
  },
  editCircleIcon: {
    position: 'absolute',
    right: moderateScale(13),
    top: moderateScaleVertical(15),
  },
  ratingIcon: {
    marginTop: moderateScaleVertical(5),
  },
});
