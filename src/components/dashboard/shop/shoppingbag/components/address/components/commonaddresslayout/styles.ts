import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../assets/commonStyles';
import {font} from '../../../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  topContainer: {
    marginBottom: moderateScaleVertical(16),
  },
  squareContainer: {
    width: '100%',
    padding: moderateScale(16),
    borderRadius: moderateScale(20),
    borderColor: color.S_GRAY_2,
    borderWidth: 1,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    ...CommonStyles.robotoMedium16,
    lineHeight: moderateScaleVertical(22),
  },
  changeAddressStyle: {
    ...CommonStyles.latoBoldBlack12,
    lineHeight: moderateScaleVertical(16),
    textTransform: 'capitalize',
    color: color.P_PINK,
  },
  nameSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginTop: moderateScaleVertical(13),
  },
  nameStyles: {
    ...CommonStyles.robotoMedium14,
    lineHeight: moderateScaleVertical(20),
  },
  defaultStyles: {
    ...CommonStyles.tpp_p3,
    color: color.S_GRAY_4,
    lineHeight: moderateScaleVertical(18),
    marginLeft: moderateScale(4),
    marginTop: -moderateScaleVertical(1.5),
    marginRight: moderateScale(8),
  },
  checkboxText: {
    ...CommonStyles.latoBoldWhite14,
    marginLeft: moderateScale(8),
    fontFamily: font.LatoMedium,
    lineHeight: moderateScaleVertical(22),
  },
  alertSection: {
    alignItems: 'center',
    marginTop: moderateScaleVertical(3),
    flexDirection: 'row',
  },
  error: {
    color: color.RED,
    fontFamily: font.RobotoMedium,
    fontSize: textScale(8),
    marginLeft: moderateScaleVertical(3),
  },
  noError: {
    height: 0,
  },
});
