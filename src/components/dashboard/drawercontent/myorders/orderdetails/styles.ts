import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {moderateScaleVertical} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  continer: {
    backgroundColor: color.WHITE,
  },
  seperator: {
    height: moderateScaleVertical(12),
    backgroundColor: color.S_GRAY_1,
  },
  height: {
    height: moderateScaleVertical(100),
    backgroundColor: color.S_GRAY_1,
  },
  bgcolor: {
    backgroundColor: color.OVERLAY,
  },
});
