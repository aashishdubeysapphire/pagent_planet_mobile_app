import {StyleSheet} from 'react-native';
import {color} from '../../../../assets/colorConstant';
import {moderateScaleVertical, width} from '../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(20),
    marginLeft: moderateScaleVertical(8),
  },
  detailsSection: {
    justifyContent: 'center',
  },
  separator: {
    width: width,
    height: moderateScaleVertical(10),
    backgroundColor: color.S_GRAY_1,
  },
  topContainer: {
    paddingTop: moderateScaleVertical(16),
    backgroundColor: color.WHITE,
  },
});
