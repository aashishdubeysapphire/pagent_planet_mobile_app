import {StyleSheet} from 'react-native';
import { color } from '../../../../../assets/colorConstant';
import { CommonStyles } from '../../../../../assets/commonStyles';
import { moderateScale, moderateScaleVertical } from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.WHITE,
    flex: 1,
  },
  tabContainer :{
    marginTop: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(24),
  },
  staticHeight:{
    height : moderateScaleVertical(100)
  },
  heading:{
    ...CommonStyles.robotoMedium16,
    lineHeight: moderateScaleVertical(22),
    paddingHorizontal: moderateScale(16)
  },
  separator:{
    height : moderateScaleVertical(12),
    width: '100%',
    backgroundColor: color.S_GRAY_1,
    marginVertical: moderateScaleVertical(16)
  }
});
