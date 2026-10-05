import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../assets/colorConstant';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  pinkView: {
    backgroundColor: color.S_PINK,
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScaleVertical(24),
  },
});
