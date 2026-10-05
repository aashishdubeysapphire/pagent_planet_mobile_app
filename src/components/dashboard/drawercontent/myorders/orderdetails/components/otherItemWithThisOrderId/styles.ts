import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  continer: {
    backgroundColor: color.WHITE,
    // padding: moderateScale(16),
  },
  heading: {
    ...CommonStyles.tpp_s3,
    backgroundColor: color.S_GRAY_1,
    paddingVertical: moderateScaleVertical(12),
    paddingHorizontal: moderateScale(16),
  },
  seperator: {
    height: moderateScaleVertical(12),
    backgroundColor: color.S_GRAY_1,
  },
});
