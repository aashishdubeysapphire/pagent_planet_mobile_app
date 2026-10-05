import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {isIosDevice} from '../../../../utils/helperFunction';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: color.WHITE,
    paddingHorizontal: moderateScale(16),
    flexDirection: 'row',
    paddingTop: moderateScaleVertical(16),
  },
  imageView: {
    width: moderateScale(60),
    height: moderateScale(60),
    marginRight: moderateScale(8),
  },
  nameStyles: {
    ...CommonStyles.tpp_h5,
    fontSize: isIosDevice() ? textScale(13) : textScale(14),
    bottom: moderateScaleVertical(2),
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(20),
  },
  nameStylesActive: {
    ...CommonStyles.tpp_h5,
    fontSize: isIosDevice() ? textScale(13) : textScale(14),
    bottom: moderateScaleVertical(2),
    color: color.P_PINK,
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(20),
  },
  headerText: {
    flexDirection: 'column',
    width: moderateScaleVertical(243),
  },
  typeStyle: {
    ...CommonStyles.tpp_p3,
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(18),
  },
  dateStyles: {
    ...CommonStyles.tpp_s1,
    marginTop: moderateScaleVertical(6),
    top: isIosDevice() ? 2 : 0,
  },
  dots: {
    marginLeft: 'auto',
    marginBottom: 'auto',
  },
  hiddenMessge: {
    flexDirection: 'row',
    paddingVertical: moderateScaleVertical(8),
    backgroundColor: color.S_GRAY_1,
    marginTop: moderateScaleVertical(8),
    paddingLeft: moderateScale(10),
  },
  hiddenTextContainer: {
    ...CommonStyles.tpp_s1,
  },
  eyeIcon: {
    marginBottom: 'auto',
    marginTop: 'auto',
    marginHorizontal: moderateScale(8),
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: 'auto',
    marginBottom: 'auto',
    textAlign: 'center',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
  },
  rowView: {
    flexDirection: 'row',
  },
  saveAsDraftText: {
    color: color.DARK_GREEN,
    marginLeft: moderateScale(16),
  },
  edited: {
    color: color.S_GRAY_4,
  },
});
