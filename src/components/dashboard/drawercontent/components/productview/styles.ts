import { StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  width
} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: color.S_GRAY_1,
    marginBottom: moderateScaleVertical(12),
  },
  productStatusSection:{
    backgroundColor: color.WHITE,
    padding : moderateScale(16),
    flexDirection:'row',  
  },
  orderSection:{
    justifyContent:'space-between',
    flexDirection:'row',
    flex:1
  },
  bottomContainer:{
    width : '100%',
    paddingBottom : moderateScale(16),
    paddingHorizontal: moderateScale(16),
    backgroundColor: color.WHITE,
  },
  wrapper :{
    borderWidth : 1,
    flexDirection:'row',
    padding : moderateScale(12),
    borderColor: color.S_GRAY_2,
    borderRadius: moderateScale(20),
  },
  imageSection: {
    marginTop : .5,  
    marginLeft : -.5  ,
  },
  productLabel: {
    ...CommonStyles.robotoMedium14,
    lineHeight : moderateScaleVertical(20),  
  },
  dateTimeStyle:{
    ...CommonStyles.tpp_s1,
    lineHeight : moderateScaleVertical(12), 
    marginTop: moderateScaleVertical(4), 
  },
  orderIdLabel:{
    ...CommonStyles.tpp_s2,
    lineHeight : moderateScaleVertical(16),  
  },
  orderIdStyle:{
    ...CommonStyles.tpp_p3,
    lineHeight : moderateScaleVertical(16),  
    fontWeight: '400',
    color : color.INPUT_TEXT
  },
  productSection: {
    marginLeft: moderateScale(8),
    width: width - moderateScale(154),
    marginTop : -moderateScaleVertical(2),
    justifyContent:'center',  
  },
  productDateTime:{
    marginLeft: moderateScale(8),
  },
  productDetails: {
    marginTop: moderateScaleVertical(8),
    flexDirection:'row', 
  },
  priceLabel:{
    ...CommonStyles.tpp_s2,
    lineHeight: moderateScaleVertical(16),
    color : color.P_PINK,
    width : moderateScale(80)
  },
  rowflexDir:{
    flexDirection:'row', 
  },
  raiseConcernSection:{
    flexDirection:'row', 
    alignItems:'center',
    width : moderateScale(120)
  },
  concernStyle:{
    ...CommonStyles.tpp_s1,
    color : color.P_PINK,
    lineHeight : moderateScaleVertical(12), 
    marginLeft : moderateScale(4)
  },
});
