import { StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';

  export const styles = StyleSheet.create({
    emptyContainer:{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:color.WHITE,
      flex: 1
    },
    textualInfo: {
      ...CommonStyles.robotoMedium14,
      lineHeight: moderateScaleVertical(20),
      marginTop: moderateScaleVertical(32)
    },
    noOrderPlaced:{
      ...CommonStyles.tpp_h5,
      fontWeight:'normal',
      lineHeight: moderateScaleVertical(18),
      marginTop: moderateScaleVertical(12),
      textAlign:'center'
    },
    buttonStyles:{
      width: moderateScale(230),
      marginTop: moderateScaleVertical(48),
    },
  });
