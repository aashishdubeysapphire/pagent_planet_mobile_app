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
  buttonArea: {
    paddingHorizontal: moderateScale(16),
    marginBottom: moderateScaleVertical(30),
  },
});
