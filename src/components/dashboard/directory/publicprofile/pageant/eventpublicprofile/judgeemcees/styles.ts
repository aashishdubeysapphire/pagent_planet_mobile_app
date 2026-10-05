import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {moderateScaleVertical} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  space: {
    marginTop: moderateScaleVertical(16),
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: color.RED,
  },
});
