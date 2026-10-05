import { StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../../../utils/helperFunction';

export const styles = StyleSheet.create({
  Container: {
    marginTop: moderateScaleVertical(24),
    marginLeft: moderateScaleVertical(8),
  },
  variationContainer: {
    backgroundColor: color.WHITE,
    borderWidth: 1,
    borderColor: color.TRANSPARENT,
    borderRadius: moderateScale(12),
    width: width / 3.45,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScaleVertical(16),
    shadowColor: isIosDevice() ? color.BLACK : color.S_GRAY_4 ,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.11,
    shadowRadius: 5,
    elevation: 6,
    marginLeft: moderateScale(8),
    marginBottom:moderateScaleVertical(8),
  },
  variationLabel: {
    ...CommonStyles.tpp_p3,
    color: color.INPUT_TEXT,
  },
  variationInfo: {
    ...CommonStyles.tpp_s2,
    color: color.P_PINK,
    lineHeight: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(8),
  },
});
