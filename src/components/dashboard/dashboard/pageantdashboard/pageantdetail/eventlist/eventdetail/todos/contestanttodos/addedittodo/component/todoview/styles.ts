import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  subHeading: {
    ...CommonStyles.tpp_h5,
  },
  redStar: {
    color: color.RED,
  },
  marginRight32: {
    marginTop: moderateScaleVertical(8),
    marginRight: moderateScale(32),
    marginBottom: moderateScaleVertical(16),
  },
});
