import {StyleSheet} from 'react-native';
import {moderateScaleVertical} from '../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  shimmerContainer: {
    alignContent: 'center',
    marginTop: moderateScaleVertical(5),
    paddingStart: moderateScaleVertical(16),
  },
  textContainer: {
    marginTop: moderateScaleVertical(16),
  },
  container: {
    marginTop: moderateScaleVertical(16),
    paddingBottom : moderateScaleVertical(16)
  },
  bottomContainer:{
    marginTop : moderateScaleVertical(24),
    paddingStart: moderateScaleVertical(8),
  }
});
