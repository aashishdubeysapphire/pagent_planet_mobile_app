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
  closedContainer: {
    borderWidth: 1,
    flexDirection: 'row',
    borderRadius: moderateScale(50),
    marginBottom: moderateScaleVertical(16),
    paddingLeft: moderateScale(24),
    paddingRight: moderateScale(10),
    paddingVertical: moderateScaleVertical(20),
    alignItems: 'center',
    borderColor: color.S_GRAY_2,
    height: moderateScaleVertical(62),
  },
  openContainer: {
    borderWidth: 1,
    borderRadius: moderateScale(30),
    marginBottom: moderateScaleVertical(16),
    paddingLeft: moderateScale(24),
    paddingRight: moderateScale(10),
    paddingTop: moderateScaleVertical(20),
    alignItems: 'center',
    borderColor: color.P_PINK,
    minHeight: moderateScaleVertical(130),
  },
  arrowIcon: {
    marginVertical: moderateScaleVertical(20),
    marginHorizontal: moderateScale(12),
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  upArrowIcon: {
    height: moderateScaleVertical(30),
  },
  infoText: {
    ...CommonStyles.tpp_p3,
    color: color.INPUT_TEXT,
    width: '86%',
    lineHeight: moderateScaleVertical(16),
    alignSelf: 'center',
  },
  textArea: {
    ...CommonStyles.tpp_p3,
    color: color.INPUT_TEXT,
    width: '96%',
    lineHeight: moderateScaleVertical(16),
    marginRight: moderateScale(10),
  },
  divider: {
    borderTopColor: color.S_GRAY_2,
    borderTopWidth: 1,
    width: '96%',
    marginTop: moderateScaleVertical(16),
    marginRight: moderateScale(10),
  },
  editingArea: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(6),
    marginBottom: moderateScaleVertical(12),
  },
  subHeading: {
    ...CommonStyles.robotoMedium14,
    color: color.BLACK,
    width: '87%',
  },
  editIcon: {
    alignSelf: 'center',
  },
  editSection: {
    alignItems: 'center',
    width: moderateScale(40),
    aspectRatio: 1,
    justifyContent: 'center',
  },
  row: {
    alignItems: 'center',
    marginTop: -moderateScaleVertical(10),
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(16),
  },
  error: {
    color: color.RED,
    fontSize: textScale(9),
    marginStart: moderateScale(2),
    fontFamily: font.RobotoMedium,
  },
  noError: {
    height: 0,
  },
});
