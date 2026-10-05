import {StyleSheet} from 'react-native';
import { color } from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {moderateScale, moderateScaleVertical,width} from '../../utils/responsiveSize';

export const styles = StyleSheet.create({
    container: {
      marginTop: moderateScaleVertical(24),
      paddingHorizontal: moderateScale(16)
    },
    bgImageStyle: {
      width: width-moderateScale(32),
      height: moderateScaleVertical(102),
      borderRadius: moderateScale(16)
    },
    body:{
      paddingHorizontal: moderateScale(16),
      marginTop: 'auto',
      marginBottom : 'auto',
      width : width - moderateScale(160),
    },
    headingStyles:{
      ...CommonStyles.robotoMedium14,
      lineHeight: moderateScaleVertical(20),
      color : color.P_PINK
    },
    subheadingStyles:{
      ...CommonStyles.tpp_s2,
      lineHeight: moderateScaleVertical(16),
      marginTop: moderateScaleVertical(8)
    }
  });
