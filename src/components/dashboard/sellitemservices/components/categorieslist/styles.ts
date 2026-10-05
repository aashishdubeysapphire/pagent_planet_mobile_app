import { StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../utils/helperFunction';

export const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: color.WHITE,
    borderWidth: 1,
    borderColor: color.TRANSPARENT,
    borderRadius: moderateScale(12),
    width: width / 3 - moderateScale(16),
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScaleVertical(8),
    shadowColor: isIosDevice() ? color.BLACK : color.S_GRAY_4 ,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.11,
    shadowRadius: 5,
    elevation: 6,
    marginLeft: moderateScale(8),
    marginTop: moderateScale(4),
    marginBottom: moderateScaleVertical(4),

  },
 
  categoryLabel: {
    ...CommonStyles.tpp_s2,
    color: color.INPUT_TEXT,
    textAlign: 'center',
    alignSelf:'center',
    lineHeight: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(8),
    height: moderateScaleVertical(32),
  },
});
