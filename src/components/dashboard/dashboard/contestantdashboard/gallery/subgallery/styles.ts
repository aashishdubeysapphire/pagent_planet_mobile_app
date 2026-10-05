import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {moderateScaleVertical} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  gap: {
    marginBottom: moderateScaleVertical(16),
  },
  listContainer: {
    padding: moderateScaleVertical(16),
  },
  loader: {
    marginTop: 1,
  },
  taj: {
    position: 'absolute',
    width: 1000,
    height: 1000,
  },
});
