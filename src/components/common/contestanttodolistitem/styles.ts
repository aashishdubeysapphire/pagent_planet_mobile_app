import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {font} from '../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../utils/responsiveSize';
export const styles = StyleSheet.create({
  closedContainer: {
    borderWidth: 1,
    borderRadius: moderateScale(20),
    marginBottom: moderateScaleVertical(16),
    marginHorizontal: moderateScale(16),
    flexDirection: 'row',
    justifyContent: 'center',
 
    borderColor: color.S_GRAY_2,
  },
  membership: {
    flexDirection: 'row',
    backgroundColor: color.WHITE,
    borderRadius: moderateScale(20),
    marginRight: moderateScale(16),
    opacity: 0.2,
  },
  column: {
    flexDirection: 'column',
    marginLeft: moderateScale(15),
    paddingBottom: moderateScaleVertical(12),
    width: width - moderateScale(64),
 
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toDoHeading: {
    ...CommonStyles.tpp_h5,
    marginVertical: moderateScaleVertical(8),
    lineHeight: moderateScaleVertical(20),
    maxWidth: '95%',
    fontSize: textScale(13),
  },
  containerConfirm: {
    flex: 0.48,
    height: moderateScaleVertical(44),
    paddingBottom: 0,
    width: moderateScale(230),
    alignSelf: 'center',
  },
  toDoText: {
    ...CommonStyles.tpp_p3,
    lineHeight: moderateScaleVertical(18),
    minWidth: '100%',
    maxWidth: '100%',
    fontSize: textScale(10.7),
  },
  lockedView: {
    zIndex: 1,
    position: 'absolute',
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: moderateScale(5),
    paddingHorizontal: moderateScale(21),
  },
  uploadImageView: {
    marginVertical: moderateScaleVertical(8),
  },
  uploadedImageView: {
    marginTop: moderateScaleVertical(8),
    flexDirection: 'row',
  },
  upgrade: {
    ...CommonStyles.tpp_h5,
    textAlign: 'center',
    marginLeft: moderateScale(8),
    marginBottom: moderateScaleVertical(24),
    color: color.INPUT_TEXT,
  },
  openContainer: {
    borderWidth: 1,
    borderRadius: moderateScale(20),
    marginBottom: moderateScaleVertical(16),
    borderColor: color.S_GRAY_2,
    marginHorizontal: moderateScale(16),
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },

  arrowIcon: {
    marginTop: moderateScaleVertical(17),
  },

  viewMore: {
    textAlign: 'right',
    fontFamily: font.LatoBold,
    color: color.P_PINK,
    fontSize: textScale(10.7),
    lineHeight: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(5),
  },
  iconRow: {
    flexDirection: 'column',

    marginRight: moderateScale(46),
    justifyContent: 'space-between',
  },

  infoTimeText: {
    fontFamily: font.RobotoMedium,
    marginHorizontal: moderateScale(4),
    marginTop: moderateScaleVertical(1),
    lineHeight: moderateScaleVertical(12),
    fontSize: textScale(9.6),
    color: color.P_GRAY_BLACK_1,
  },
  infoText: {
    ...CommonStyles.tpp_s1,
    marginHorizontal: moderateScale(4),

    lineHeight: moderateScaleVertical(12),
    color: color.P_GRAY_BLACK_1,
  },
  infoText1: {
    fontFamily: font.RobotoRegular,
    marginHorizontal: moderateScale(4),
    lineHeight: moderateScaleVertical(12),
    fontSize: textScale(9.6),
    color: color.S_GRAY_3,
    maxWidth: '95%',
  },
  borderButtonText: {
    color: color.P_PINK,
    fontSize: textScale(14),
    fontFamily: font.LatoBold,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  dateTag: {
    borderWidth: 1,
    borderRadius: 14,
    marginTop: moderateScaleVertical(12),
  },
  infoView: {
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(10),
  },

  editCircleIcon: {
    marginTop: moderateScaleVertical(9),
    marginRight: moderateScale(8),
  },
  linkTitle: {
    fontFamily: font.RobotoMedium,
    fontSize: textScale(11),
    lineHeight: moderateScaleVertical(16),
    color: color.P_PINK,
    maxWidth: '95%',
    marginBottom: moderateScaleVertical(4),
  },
  deleteIcon: {
    marginTop: moderateScaleVertical(10),
    marginRight: moderateScale(8),
  },
  dateText: {
    ...CommonStyles.robotoMedium14,
    paddingVertical: moderateScaleVertical(3),
    marginHorizontal: moderateScale(12),
    fontSize: textScale(10),
  },
});
