import {StyleSheet} from 'react-native';
import {color} from '../../../../assets/colorConstant';
import {moderateScaleVertical} from '../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  wrapper: {
    backgroundColor: color.S_GRAY_1,
    flex: 1,
  },
  shimmerContainer: {
    backgroundColor: color.WHITE,
  },
  staticHeight: {
    height: moderateScaleVertical(100),
  },
});
