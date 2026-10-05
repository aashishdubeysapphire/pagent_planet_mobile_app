import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  selected: {
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(16),
  },

  selectedText: {
    ...CommonStyles.tpp_s2,
    marginLeft: moderateScale(2),
    marginBottom: moderateScaleVertical(16),
    lineHeight: moderateScaleVertical(16),
  },
  radioButtonImage: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  unselectedText: {
    ...CommonStyles.tpp_p2,
    marginLeft: moderateScale(8),
    color: color.S_GRAY_4,
    fontWeight: '400',
    lineHeight: moderateScaleVertical(20),
  },
});
