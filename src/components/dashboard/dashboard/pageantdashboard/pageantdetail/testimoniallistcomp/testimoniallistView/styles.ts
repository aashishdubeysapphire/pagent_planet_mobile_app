import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {moderateScaleVertical} from '../../../../../../utils/responsiveSize';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  viewContainer: {
    backgroundColor: color.WHITE,
  },
  listView: {
    marginTop: moderateScaleVertical(16),
  },
});
