import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';
import { CommonStyles } from '../../../../../assets/commonStyles';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.WHITE,
    flex: 1,
  },
  squareContainer: {
    paddingLeft: moderateScale(8),
    paddingBottom: moderateScaleVertical(60),
  },
  heading: {
    ...CommonStyles.tpp_s3,
    lineHeight:moderateScaleVertical(22),
    marginVertical: moderateScaleVertical(16),
    marginHorizontal:moderateScale(16),
  
  },
  tabContainer: {
    marginTop: moderateScaleVertical(16),
  },
});
