import { StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  wrapper: {
    paddingLeft : moderateScale(16),
    paddingTop: moderateScaleVertical(24)
  },
  headingStyles:{
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    marginBottom: moderateScaleVertical(24),
    lineHeight: moderateScaleVertical(24),
    fontWeight: '800',
  }
});
