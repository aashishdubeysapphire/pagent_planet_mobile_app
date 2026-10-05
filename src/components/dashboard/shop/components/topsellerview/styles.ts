import { StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  detailsContainer:{
    flexDirection:'row',
    justifyContent:'space-around'
  },
  productTitle: {
    ...CommonStyles.robotoMedium14,
    lineHeight: moderateScaleVertical(20),
    width: moderateScale(150),
    marginBottom: moderateScaleVertical(3),
  },
  rectangularView:{
    width : width - moderateScale(32),
    padding: moderateScale(12),     
    borderWidth : 1,
    borderRadius : moderateScale(20),
    borderColor : color.S_GRAY_2 ,
    marginBottom: moderateScale(12),
    flexDirection:'row',
  },
  viewProductArea:{
    justifyContent:'center',
    alignItems:'flex-end',
    flex:1,
  },
  titleArea:{
    marginLeft: moderateScale(8),
    justifyContent:'center',
  },
  viewProductLabel:{
    ...CommonStyles.latoSemiBold12,
    lineHeight: moderateScale(16),
    fontWeight:'700',
    width: moderateScale(100),
    textAlign:'right',
  },
  noOfProduct:{
     ...CommonStyles.tpp_s2,
     color: color.BLACK,
     marginTop: moderateScaleVertical(8)
  }
});
