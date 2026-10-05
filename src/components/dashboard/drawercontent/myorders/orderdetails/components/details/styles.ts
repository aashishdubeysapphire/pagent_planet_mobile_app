import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  continer: {
    backgroundColor: color.WHITE,
    padding: moderateScale(16),
  },
  heading: {
    ...CommonStyles.tpp_s3,
    color: color.BLACK,
    ...CommonStyles.capitalizedCase,
  },
  name: {
    ...CommonStyles.tpp_h5,
    ...CommonStyles.capitalizedCase,
    fontSize: textScale(14),
    color: color.BLACK,
    marginTop: moderateScaleVertical(12),
  },
  marginTop16: {
    marginTop: moderateScaleVertical(16),
  },
  orderNotesText: {
    ...CommonStyles.tpp_p3,
    color: color.P_GRAY_BLACK_1,
    marginTop: moderateScaleVertical(8),
  },
});
