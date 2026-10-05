import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  scrollView: {
    paddingHorizontal: moderateScale(16),
  },
  stepsImage: {
    height: moderateScaleVertical(102),
    marginBottom: moderateScaleVertical(16),
    paddingHorizontal: moderateScale(16),
  },
  greyView: {
    backgroundColor: color.S_GRAY_1,
    marginTop: moderateScaleVertical(16),
    flexDirection: 'row',
    paddingHorizontal: moderateScale(16),
    marginBottom: moderateScaleVertical(8),
  },
  greyViewText: {
    ...CommonStyles.tpp_s3,
    lineHeight: 22,
    width: moderateScale(288),
    paddingVertical: moderateScaleVertical(12),
    ...CommonStyles.capitalizedCase,
  },
  skipText: {
    ...CommonStyles.latoBoldBlack12,
    color: color.P_PINK,
    fontSize: textScale(14),
    marginLeft: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(20),
    textAlign: 'center',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
    marginBottom: 'auto',
  },
  marginB: {
    marginBottom: moderateScaleVertical(16),
  },
});
