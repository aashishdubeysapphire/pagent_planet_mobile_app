import {StyleSheet} from 'react-native';
import {color} from '../../../../assets/colorConstant';
import {CommonStyles} from '../../../../assets/commonStyles';
import {moderateScale, moderateScaleVertical} from '../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  continer: {
    flex: 1,
  },
  rowView:{
flexDirection:"row",
padding:moderateScale(16),
backgroundColor:color.WHITE
  },
  note: {
    ...CommonStyles.tpp_s2,
    color: color.BLACK,
    ...CommonStyles.capitalizedCase,
  },
  noteText: {
    ...CommonStyles.tpp_p3,
    color: color.S_GRAY_4,
    lineHeight:moderateScaleVertical(18),
    ...CommonStyles.capitalizedCase,
  },
});
