import {StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';
import {color} from '../../../../../assets/colorConstant';
import {isIosDevice} from '../../../../utils/helperFunction';

export const styles = StyleSheet.create({
  buttonStyle: {
    bottom:
      isIosDevice()
        ? moderateScaleVertical(160)
        : moderateScaleVertical(110),
    right: moderateScale(16),
    position: 'absolute',
    backgroundColor: color.P_PINK,
  },
  buttonStyle1: {
    bottom:
      isIosDevice()
        ? moderateScaleVertical(174)
        : moderateScaleVertical(124),
    right: moderateScale(30),
    position: 'absolute',
  },
  buttonStyle2: {
    bottom:
      isIosDevice()
        ? moderateScaleVertical(176)
        : moderateScaleVertical(125),
    right: moderateScale(110),
    position: 'absolute',
    flexDirection: 'row',
  },
});
