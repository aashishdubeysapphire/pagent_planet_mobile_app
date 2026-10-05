import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import { font } from '../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: moderateScaleVertical(24),
    paddingHorizontal: moderateScale(16),
    backgroundColor: color.S_GRAY_1,
  },
  heading: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    marginBottom: moderateScaleVertical(24),
  },
 
  imageCustomStyle: {
    alignItems: 'flex-start',
  },
  soldByName: {
    ...CommonStyles.robotoMedium14,
    lineHeight: moderateScaleVertical(20),
    ...CommonStyles.capitalizedCase,
  },
  nameAndRatingView: {
    flexDirection: 'column',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: moderateScale(8),
    flex:1,
  },
  messageimg: {
    marginLeft: 'auto',
  },
  shipperGuaranteeText: {
    ...CommonStyles.tpp_s2,
    fontFamily:font.RobotoRegular,
    marginTop: moderateScaleVertical(12),
    ...CommonStyles.capitalizedCase,
  },
  productAvailableInText: {
    ...CommonStyles.tpp_s2,
    marginTop: moderateScaleVertical(16),
    ...CommonStyles.capitalizedCase,
    marginBottom: moderateScaleVertical(8),
  },
  countriesOvel: {
    borderColor: color.S_GRAY_2,
    borderWidth: 1,
    backgroundColor: color.WHITE,
    paddingVertical: moderateScaleVertical(6),
    paddingHorizontal: moderateScale(12),
    borderRadius: 100,
    marginRight: moderateScale(4),
    marginBottom: moderateScaleVertical(4),
  },
  soldCard : {
    borderColor: color.S_GRAY_2,
    borderWidth: 1,
    backgroundColor: color.WHITE,
    paddingVertical: moderateScaleVertical(16),
    paddingHorizontal: moderateScale(16),
    borderRadius: 30,
    marginBottom: moderateScaleVertical(16),
    height: moderateScaleVertical(90),
    flexDirection: 'row',
  },
  wrapView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  viewMore: {
    ...CommonStyles.tpp_s1,
    color: color.P_PINK,
    marginLeft: 'auto',
    marginTop: moderateScaleVertical(4),
  },
  searchView: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(16),
    marginRight:"auto"
  },
  findProductText: {
    ...CommonStyles.tpp_h5,
    color: color.P_PINK,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: moderateScale(8),
    ...CommonStyles.capitalizedCase,

  },
  countryName:{
    ...CommonStyles.tpp_p4,
    ...CommonStyles.capitalizedCase,
    marginTop: 'auto',
    marginBottom: 'auto',
    color:color.BLACK

  },
  contactBtn: {
    borderColor: color.P_PINK,
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScaleVertical(14),
    marginBottom: moderateScaleVertical(24)
  },
  contactText: {
    ...CommonStyles.latoBoldWhite14,
    color: color.P_PINK,
    lineHeight: moderateScaleVertical(20),
    textAlign: 'center',
    
  },
});
