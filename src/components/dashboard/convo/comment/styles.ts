import {StyleSheet} from 'react-native';
import {color} from '../../../../assets/colorConstant';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  seperatorStyle: {
    height: moderateScaleVertical(8),
    backgroundColor: color.S_GRAY_1,
    marginBottom: moderateScaleVertical(16),
  },
  commentView: {
    marginHorizontal: moderateScale(16),
  },
  freeHeight: {
    height: moderateScaleVertical(120),
    backgroundColor: 'red',
  },
});
