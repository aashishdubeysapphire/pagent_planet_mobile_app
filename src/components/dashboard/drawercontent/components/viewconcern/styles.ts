import { StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {
  moderateScaleVertical
} from '../../../../utils/responsiveSize';

  export const styles = StyleSheet.create({
    container:{
      paddingBottom: moderateScaleVertical(40),
      height : moderateScaleVertical(224)
    },
    reasonSection:{
      flexDirection:'row',
      alignItems:'center',
    },
    headingLabel: {
      ...CommonStyles.robotoMedium14,
      lineHeight: moderateScaleVertical(20),
      color: color.INPUT_TEXT
    },
    reasonTypeLabel:{
      ...CommonStyles.tpp_p2,
      fontWeight:'400',
      lineHeight: moderateScaleVertical(20),
      color : color.INPUT_TEXT
    },
    statusType:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      flex:1,
    },
    statusLabel:{
      ...CommonStyles.tpp_s2,
      lineHeight: moderateScaleVertical(16),
    },
    commentSection:{
      marginTop: moderateScaleVertical(12)
    },
    commentBodyLabel:{
      ...CommonStyles.tpp_p2,
      fontWeight:'400',
      lineHeight: moderateScaleVertical(20),
      color : color.INPUT_TEXT,
      marginTop : moderateScaleVertical(4)
    }
  });
