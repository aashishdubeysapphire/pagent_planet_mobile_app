import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: moderateScaleVertical(16),
    backgroundColor: color.WHITE,
  },
  space: {
    height: moderateScaleVertical(16),
  },
  customTitleStyles: {
    ...CommonStyles.tpp_s2,
    lineHeight: moderateScaleVertical(16),
    padding: moderateScale(8),
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  staticHeight: {
    height: moderateScaleVertical(50),
  },
});
