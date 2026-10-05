import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {isIosDevice} from '../../../../utils/helperFunction';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: color.WHITE,
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScaleVertical(12),
  },
  line: {
    height: 1,
    backgroundColor: color.S_GRAY_2,
    marginBottom: moderateScaleVertical(16),
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    ...CommonStyles.tpp_s2,
    marginLeft: moderateScale(8),
    bottom: isIosDevice() ? 0 : 2,
  },
  bigRowView: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(40),
    marginBottom: moderateScaleVertical(16),
  },
  extraStyles: {
    marginRight: 'auto',
    marginLeft: 'auto',
  },
});
