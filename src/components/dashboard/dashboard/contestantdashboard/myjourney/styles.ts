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
    paddingTop: moderateScaleVertical(42),
    flex: 1,
  },
  header: {
    marginEnd: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(16),
    marginStart: moderateScaleVertical(16),
  },
  title: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    marginHorizontal: moderateScale(32),
    marginVertical: moderateScaleVertical(48),
    fontSize: textScale(17),
    textAlign: 'center',
  },
  buttonContainer: {
    marginHorizontal: moderateScale(16),
    alignItems: 'center',
    marginBottom: moderateScaleVertical(50),
  },
  heading: {
    ...CommonStyles.tpp_h2,
    marginBottom: moderateScaleVertical(16),
    color: color.BLACK,
    lineHeight: 24,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(16),
    marginTop: moderateScaleVertical(8),
  },
  shimmerContainer: {
    marginTop: moderateScaleVertical(24),
  },
  floatingicon: {
    height: 60,
    width: 60,
    position: 'absolute',
    bottom: moderateScaleVertical(40),
    right: moderateScale(5),
  },
  staticHeight: {
    height: moderateScaleVertical(50),
  },
});
