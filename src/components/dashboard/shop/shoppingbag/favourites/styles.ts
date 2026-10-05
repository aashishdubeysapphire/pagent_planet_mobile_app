import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {moderateScaleVertical} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    backgroundColor: color.WHITE,
  },

  loader: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    minHeight: moderateScaleVertical(100),
    maxHeight: moderateScaleVertical(100),
  },

  listContainer: {
    flex: 1,
    paddingTop: moderateScaleVertical(16),
    backgroundColor: color.WHITE,
  },
});
