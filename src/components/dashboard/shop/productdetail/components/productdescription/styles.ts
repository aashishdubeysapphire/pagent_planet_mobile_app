import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  descriptionText: {
    ...CommonStyles.tpp_p3,
    lineHeight:18,
    marginTop: moderateScaleVertical(24),
    marginHorizontal: moderateScale(16),
  },
  viewmore: {
    ...CommonStyles.tpp_s1,
    color: color.P_PINK,
    marginLeft: 'auto',
    marginTop: moderateScaleVertical(9),
    marginHorizontal: moderateScale(16),

  },
});
