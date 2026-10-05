import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: moderateScaleVertical(16),
    backgroundColor: color.WHITE,
  },

  space: {
    flex: 1,
    marginTop: moderateScaleVertical(16),
    marginLeft: moderateScale(16),
  },
});
