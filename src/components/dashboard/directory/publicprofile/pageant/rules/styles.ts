import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {moderateScaleVertical} from '../../../../../utils/responsiveSize';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: moderateScaleVertical(16),
    backgroundColor: color.WHITE,
  },
  space: {
    marginTop: moderateScaleVertical(16),
  },
});
