import {StyleSheet} from 'react-native';
import {color} from '../../../../assets/colorConstant';
import {CommonStyles} from '../../../../assets/commonStyles';
import {moderateScaleVertical} from '../../../utils/responsiveSize';
export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.WHITE,
    flex: 1,
  },
  container: {
    flexGrow: 1,
  },
  inactiveLabel: {
    ...CommonStyles.robotoMedium14,
    color: color.P_PINK,
    lineHeight: moderateScaleVertical(20),
    textAlign: 'center',
  },
  detailsArea: {
    paddingHorizontal: moderateScaleVertical(16),
    paddingVertical: moderateScaleVertical(10),
    backgroundColor: color.S_PINK,
  },
  whiteView:{
    height:moderateScaleVertical(100)
  },
});
