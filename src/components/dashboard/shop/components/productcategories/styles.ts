import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import { CommonStyles } from '../../../../../assets/commonStyles';
import { moderateScaleVertical,moderateScale } from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.WHITE,
    paddingBottom : moderateScaleVertical(200)
  },
  squareContainer:{
    paddingLeft : moderateScale(8),
    paddingTop: moderateScaleVertical(24),
    height : moderateScaleVertical(192+24) + moderateScale(108),
  },
  headingStyles:{
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    marginBottom: moderateScaleVertical(24),
    paddingHorizontal: moderateScale(16),
    lineHeight: moderateScaleVertical(24),
    fontWeight: '800',
  },
  categoriesStyle: {
    marginBottom: moderateScaleVertical(8),
    borderRadius: moderateScale(20),
    marginTop: - moderateScaleVertical(8)
  }
});
