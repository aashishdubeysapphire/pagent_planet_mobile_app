import { StyleSheet} from 'react-native';
import {color} from '../../../../assets/colorConstant';
import {CommonStyles} from '../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.WHITE,
    flex: 1,
  },
  bgColor:{
    backgroundColor: color.S_GRAY_1,
    // paddingBottom: moderateScaleVertical(60),
  },

  productContainer:{
    marginTop: moderateScaleVertical(12),
    padding: moderateScale(16),
    backgroundColor: color.WHITE,
    paddingRight: 0
  },
  headingStyles: {
    ...CommonStyles.robotoMedium14,
    lineHeight: moderateScaleVertical(20),
  },
  categoryContainer:{
    marginLeft: moderateScale(-16),
    marginBottom: moderateScale(-16)
  },
  recentSearchArea:{
    backgroundColor: color.WHITE,
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateScale(8)
  },
  heading:{
    ...CommonStyles.robotoMedium14,
    color: color.INPUT_TEXT,
    lineHeight: moderateScaleVertical(20),
    marginBottom: moderateScaleVertical(16),
  },
  recentSearchText:{
    ...CommonStyles.tpp_p2,
    color: color.S_GRAY_4,
    lineHeight: moderateScaleVertical(20),
    width: '90%'
  },
  searchSection:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom : moderateScaleVertical(8),
  },
  bottomEmptySpace:{
    height: moderateScaleVertical(200)
  }
});
