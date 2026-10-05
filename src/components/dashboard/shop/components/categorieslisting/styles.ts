import { StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  categoriesView:{
    paddingRight:0,
    paddingBottom:0,
    paddingLeft: moderateScale(16),     
  },
  categoryLabel: {
    ...CommonStyles.tpp_s1,
    color: color.INPUT_TEXT,
    textAlign: 'center',
    lineHeight: moderateScaleVertical(12),
    marginTop: moderateScaleVertical(4),
    height: moderateScaleVertical(24),
  },
  circularView:{
    width : width/5.8,
    marginRight : moderateScale(4),
    marginBottom : moderateScaleVertical(24)
  }
});
