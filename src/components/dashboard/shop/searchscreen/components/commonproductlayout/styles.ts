import { StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
    productContainer:{
      marginTop: moderateScaleVertical(12),
      padding: moderateScale(16),
      backgroundColor: color.WHITE,
      paddingRight: 0,
    },
    headingStyles: {
      ...CommonStyles.robotoMedium14,
     lineHeight: moderateScaleVertical(20),
     marginBottom : moderateScaleVertical(16),
    },
});
