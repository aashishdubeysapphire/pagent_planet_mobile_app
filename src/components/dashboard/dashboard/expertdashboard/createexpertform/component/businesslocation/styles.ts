import {StyleSheet} from 'react-native';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../utils/responsiveSize';
import {color} from '../../../../../../../assets/colorConstant';
import {font} from '../../../../../../../assets/fonts/fontsConstant';
import {isIosDevice} from '../../../../../../utils/helperFunction';

export const styles = StyleSheet.create({
  continer: {
    backgroundColor: color.S_GRAY_1,
    marginTop: moderateScaleVertical(12),
    padding: moderateScaleVertical(12),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: color.S_GRAY_2,
  },
  heading: {
    ...CommonStyles.tpp_h5,
    fontSize: textScale(14),
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 'auto',
  },
  pinkText: {
    color: color.P_PINK,
  },

  rowView: {
    flexDirection: 'row',
  },
  arrowColaps: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft:"auto"
  },
  whiteLocation: {
    backgroundColor: color.WHITE,
    marginTop: moderateScaleVertical(12),
    padding: moderateScaleVertical(12),
    borderRadius: 20,
  },
  whiteLocationText: {
    ...CommonStyles.tpp_p2,
    color: color.BLACK,
  },
  openingHoursText: {
    ...CommonStyles.tpp_h5,
    marginTop: moderateScaleVertical(24),
    fontSize: textScale(14),
  },
  subHeading: {
    ...CommonStyles.tpp_s2,
  },
  marRight28: {
    marginRight: moderateScale(28),
  },
  marRight90: {
    marginRight: moderateScale(90),
  },
  marTop16: {
    marginTop: moderateScaleVertical(16),
  },
  line: {
    borderWidth: 0.8,
    borderColor: color.S_GRAY_2,
    marginTop: moderateScaleVertical(12),
  },
  dayText: {
    ...CommonStyles.tpp_s2,
    // fontSize: textScale(10.5),
    position: 'absolute',
    top: isIosDevice() ? moderateScaleVertical(6) : moderateScaleVertical(4),
    // lineHeight:moderateScaleVertical(16)
  },
  toggleStyle: {
    width: moderateScale(64),
    height: moderateScaleVertical(28),
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  open: {
    color: color.WHITE,
    left: moderateScale(9),
  },
  close: {
    color: color.S_GRAY_4,
    right: moderateScale(10),
  },
  marTop18: {
    marginTop: moderateScaleVertical(18),
  },
  timeView: {
    backgroundColor: color.WHITE,
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScaleVertical(8),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: color.S_GRAY_2,
    width: moderateScale(110),
  },
  timeText: {
    ...CommonStyles.tpp_p2,
    color: color.BLACK,
    marginRight: moderateScale(8),
    // marginLeft:"auto"
  },
  clockStyle: {},
  marLeft8: {
    marginLeft: moderateScale(8),
  },
  editIcon: {
    marginRight: moderateScale(12),
  },
  error: {
    ...CommonStyles.capitalizedCase,
    color: color.RED,
    marginStart: moderateScale(8),
    fontSize: textScale(8),
    fontFamily: font.RobotoMedium,
  },
});
