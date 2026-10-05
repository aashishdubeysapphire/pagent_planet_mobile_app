import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  mainView: {
    marginTop: moderateScaleVertical(8),
    backgroundColor: color.WHITE,
    padding: moderateScale(16),
    flexDirection: 'row',
    height: moderateScaleVertical(56),
  },
  lable: {
    ...CommonStyles.tpp_s3,
    lineHeight: moderateScaleVertical(22),
    marginRight: 'auto',
  },
  loaderSmall:{
    marginRight:moderateScale(16)
  }
});
