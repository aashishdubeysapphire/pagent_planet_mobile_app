import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../../assets/commonStyles';
import {moderateScaleVertical} from '../../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  heading: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    marginBottom: moderateScaleVertical(16),
  },
  inputbottomHeight: {
    height: moderateScaleVertical(8),
  },
});
