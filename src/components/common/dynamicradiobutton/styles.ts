import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {moderateScale, moderateScaleVertical} from '../../utils/responsiveSize';

export const styles = StyleSheet.create({
  selected: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(16),
  },
  selectedText: {
    ...CommonStyles.tpp_h4,
    marginLeft: moderateScale(8),
  },
  radioButtonImage: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  unselectedText: {
    ...CommonStyles.tpp_h4,
    marginLeft: moderateScale(8),
    color: color.S_GRAY_4,
  },
});
