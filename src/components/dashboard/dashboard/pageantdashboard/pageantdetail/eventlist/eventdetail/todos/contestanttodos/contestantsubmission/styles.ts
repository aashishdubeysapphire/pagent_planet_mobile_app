import {StyleSheet, Dimensions} from 'react-native';
import {color} from '../../../../../../../../../../assets/colorConstant';
import {moderateScaleVertical} from '../../../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  tabsView: {
    height: Dimensions.get('window').height,
    marginTop: -moderateScaleVertical(8),
  },
  shimmerView: {
    marginTop: moderateScaleVertical(22),
  },
});
