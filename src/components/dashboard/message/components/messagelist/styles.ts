import {StyleSheet} from 'react-native';
import { color } from '../../../../../assets/colorConstant';
import { CommonStyles } from '../../../../../assets/commonStyles';
import { height, moderateScale, moderateScaleVertical, width } from '../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../utils/helperFunction';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.S_GRAY_1,
    height : height- moderateScaleVertical(80)
  },
  deleteIconStyle:{
    bottom : isIosDevice() ? moderateScaleVertical(150)
            : moderateScaleVertical(100),
    left: width- moderateScale(78),
  },
  deleteImgStyle:{
    height: moderateScale(65),
    aspectRatio:1,
  },
  footerView:{
    height: moderateScaleVertical(180)
 },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(8),
    textAlign: 'center',
    marginBottom: 'auto',
    lineHeight: moderateScaleVertical(24),
  },
});
