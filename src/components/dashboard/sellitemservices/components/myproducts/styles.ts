import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  wrapper:{
    marginBottom : moderateScaleVertical(60),
    height : '90%'
  },
  container: {
    backgroundColor: color.S_GRAY_1,
    borderWidth : 1,
    borderColor: color.S_GRAY_2,
    borderRadius: moderateScale(16),
    marginBottom: moderateScale(8),
    alignItems:'flex-start',
    marginTop: moderateScale(8),
    marginLeft: moderateScale(8),
  },
  topSection :{
    backgroundColor: color.WHITE,
    borderRadius: moderateScale(16),
    width : '100%',
    alignItems:'flex-start',
    flexDirection:'row',
    padding : moderateScale(12),
    borderWidth : 0,
  },
  imageSection: {
    marginTop : .5,  
    marginLeft : -.5  ,
  },
  productLabel: {
    ...CommonStyles.robotoMedium14,
    color: color.INPUT_TEXT,
    lineHeight : moderateScaleVertical(20),   
  },
  productSection: {
    marginLeft: moderateScale(12),
    width: width - moderateScale(158),
  },
  statsSection: {
    marginTop: moderateScaleVertical(8),
    flexDirection:'row',
    justifyContent:'space-between',
  },
  bottomSection:{
    padding : moderateScale(12),
    width : '100%',
  },
  statsLabel:{
    ...CommonStyles.tpp_s1,
    marginLeft: moderateScale(4),
  },
  statsContainer:{
    flexDirection:'row',
    alignItems:'center',
  },
  stockIcon:{
    width : moderateScale(8),
    height: moderateScale(8),
    borderRadius : moderateScale(4)
  },
  categoryContainer:{
    justifyContent:'space-between',
    marginTop: moderateScaleVertical(12),
    flexDirection:'row',
    alignItems:'center',
  },
  categoryLabel:{
    ...CommonStyles.tpp_s2,
    marginLeft: moderateScale(8),
    lineHeight: moderateScaleVertical(16)
  },
  categoryInfo:{
    ...CommonStyles.tpp_s2,
    marginLeft: moderateScale(4),
    fontWeight:'normal'
  },
  editSection:{
    flexDirection:'row',
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(20),
    textAlign: 'center',
    marginBottom: 'auto',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
  },
  bottomHeight:{
    height : moderateScaleVertical(100)
  },
  topLayer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:"center",
  }
});
